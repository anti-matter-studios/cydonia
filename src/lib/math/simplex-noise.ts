/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { createRandomGenerator, type RandomGeneratorSeed } from "@/lib/math/random-generator";
import { dot3 } from "@/lib/math/vector";


const DEFAULT_SEED = 1;
const F3 = 1 / 3;
const G3 = 1 / 6;
const SIMPLEX_SCALE_3D = 32;
const SIMPLEX_CORNER_RADIUS = 0.6;
const PERMUTATION_SIZE = 256;

const GRADIENTS_3D: ReadonlyArray<readonly [number, number, number]> = [
    [1, 1, 0],
    [-1, 1, 0],
    [1, -1, 0],
    [-1, -1, 0],
    [1, 0, 1],
    [-1, 0, 1],
    [1, 0, -1],
    [-1, 0, -1],
    [0, 1, 1],
    [0, -1, 1],
    [0, 1, -1],
    [0, -1, -1]
];

/** Options used when sampling multiple Simplex noise octaves. */
export interface LayeredSimplexNoiseOptions {
    /** Output amplitude after octave normalisation. */
    readonly initialAmplitude?: number;

    /** Domain offset applied after frequency scaling. */
    readonly offset?: readonly [number, number, number];

    /** Frequency of the first octave. */
    readonly scale?: number;

    /** Number of octaves to blend together. */
    readonly octaves?: number;

    /** Amplitude multiplier between octaves. */
    readonly persistence?: number;

    /** Frequency multiplier between octaves. */
    readonly lacunarity?: number;
}

/** Callable object that samples seeded 3D Simplex noise. */
export interface SimplexNoiseSampler {
    /** Samples 3D Simplex noise at a given coordinate. */
    (x: number, y: number, z: number): number;

    /** The noise algorithm used by this sampler. */
    readonly algorithm: "simplex";

    /** Seed used to initialise the gradient permutation. */
    readonly seed: RandomGeneratorSeed;

    /** Samples layered Simplex noise at a given coordinate. */
    readonly layered: (
        x: number,
        y: number,
        z: number,
        options?: LayeredSimplexNoiseOptions
    ) => number;
}

/**
 * Creates a deterministic 3D Simplex noise sampler.
 *
 * @param seed The seed used to shuffle the Simplex gradient permutation.
 * @returns A function that samples Simplex noise in roughly `[-1, 1]`.
 */
export function createSimplexNoiseSampler(seed: RandomGeneratorSeed = DEFAULT_SEED): SimplexNoiseSampler {
    const permutation = createPermutation(seed);

    function sampleSimplexNoise(x: number, y: number, z: number): number {
        const skew = (x + y + z) * F3;
        const i = Math.floor(x + skew);
        const j = Math.floor(y + skew);
        const k = Math.floor(z + skew);

        const unskew = (i + j + k) * G3;
        const x0 = x - (i - unskew);
        const y0 = y - (j - unskew);
        const z0 = z - (k - unskew);

        const [i1, j1, k1, i2, j2, k2] = getSimplexCornerOffsets(x0, y0, z0);

        const x1 = x0 - i1 + G3;
        const y1 = y0 - j1 + G3;
        const z1 = z0 - k1 + G3;
        const x2 = x0 - i2 + 2 * G3;
        const y2 = y0 - j2 + 2 * G3;
        const z2 = z0 - k2 + 2 * G3;
        const x3 = x0 - 1 + 3 * G3;
        const y3 = y0 - 1 + 3 * G3;
        const z3 = z0 - 1 + 3 * G3;

        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;

        return SIMPLEX_SCALE_3D * (
            sampleCorner(permutation, ii, jj, kk, x0, y0, z0)
            + sampleCorner(permutation, ii + i1, jj + j1, kk + k1, x1, y1, z1)
            + sampleCorner(permutation, ii + i2, jj + j2, kk + k2, x2, y2, z2)
            + sampleCorner(permutation, ii + 1, jj + 1, kk + 1, x3, y3, z3)
        );
    }

    function sampleLayeredNoise(
        x: number,
        y: number,
        z: number,
        options?: LayeredSimplexNoiseOptions
    ): number {
        return sampleLayeredSimplexNoise(sampleSimplexNoise, x, y, z, options);
    }

    return Object.defineProperties(sampleSimplexNoise, {
        algorithm: {
            enumerable: true,
            value: "simplex"
        },
        layered: {
            enumerable: true,
            value: sampleLayeredNoise
        },
        seed: {
            enumerable: true,
            value: seed
        }
    }) as SimplexNoiseSampler;
}

type SimplexNoiseSampleFunction = (x: number, y: number, z: number) => number;

function sampleLayeredNoise(
    noise: SimplexNoiseSampleFunction,
    x: number,
    y: number,
    z: number,
    options: LayeredSimplexNoiseOptions = {}
): number {
    const initialAmplitude = options.initialAmplitude ?? 1;
    const [offsetX, offsetY, offsetZ] = options.offset ?? [0, 0, 0];
    let amplitude = 1;
    let frequency = options.scale ?? 1;
    let height = 0;
    let amplitudeSum = 0;

    for (let octave = 0; octave < (options.octaves ?? 1); octave++) {
        height += amplitude * noise(
            x * frequency + offsetX,
            y * frequency + offsetY,
            z * frequency + offsetZ
        );
        amplitudeSum += amplitude;
        amplitude *= options.persistence ?? 0.5;
        frequency *= options.lacunarity ?? 2;
    }

    return amplitudeSum === 0 ? 0 : (height / amplitudeSum) * initialAmplitude;
}

/**
 * Samples layered Simplex noise at a given 3D coordinate.
 *
 * @param noise The base Simplex noise sampler.
 * @param x The x coordinate to sample.
 * @param y The y coordinate to sample.
 * @param z The z coordinate to sample.
 * @param options The octave blend options.
 * @returns A normalised layered sample in roughly `[-1, 1]`.
 */
export function sampleLayeredSimplexNoise(
    noise: SimplexNoiseSampleFunction,
    x: number,
    y: number,
    z: number,
    options: LayeredSimplexNoiseOptions = {}
): number {
    return sampleLayeredNoise(noise, x, y, z, options);
}

function createPermutation(seed: RandomGeneratorSeed): Uint8Array<ArrayBuffer> {
    const random = createRandomGenerator(seed);
    const source = new Uint8Array(PERMUTATION_SIZE);

    for (let index = 0; index < source.length; index++) {
        source[index] = index;
    }

    for (let index = source.length - 1; index > 0; index--) {
        const swapIndex = random.nextUint32() % (index + 1);
        const value = source[index];
        source[index] = source[swapIndex];
        source[swapIndex] = value;
    }

    const permutation = new Uint8Array(PERMUTATION_SIZE * 2);

    for (let index = 0; index < permutation.length; index++) {
        permutation[index] = source[index & 255];
    }

    return permutation;
}

function getSimplexCornerOffsets(
    x: number,
    y: number,
    z: number
): [number, number, number, number, number, number] {
    if (x >= y) {
        if (y >= z) {
            return [1, 0, 0, 1, 1, 0];
        }

        if (x >= z) {
            return [1, 0, 0, 1, 0, 1];
        }

        return [0, 0, 1, 1, 0, 1];
    }

    if (y < z) {
        return [0, 0, 1, 0, 1, 1];
    }

    if (x < z) {
        return [0, 1, 0, 0, 1, 1];
    }

    return [0, 1, 0, 1, 1, 0];
}

function sampleCorner(
    permutation: Uint8Array<ArrayBuffer>,
    i: number,
    j: number,
    k: number,
    x: number,
    y: number,
    z: number
): number {
    const radius = SIMPLEX_CORNER_RADIUS - x * x - y * y - z * z;

    if (radius < 0) {
        return 0;
    }

    const gradient = GRADIENTS_3D[
        permutation[i + permutation[j + permutation[k]]] % GRADIENTS_3D.length
    ];
    const radiusSquared = radius * radius;

    return radiusSquared * radiusSquared * dot3(gradient[0], gradient[1], gradient[2], x, y, z);
}
