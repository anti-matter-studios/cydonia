/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import {
    BufferGeometry,
    Float32BufferAttribute,
    IcosahedronGeometry,
    Vector3
} from "three";

import {
    createSimplexNoiseSampler,
    sampleLayeredSimplexNoise
} from "@/lib/math";


const DEFAULT_RADIUS = 1;
const DEFAULT_DETAILS = 4;
const DEFAULT_HEIGHT_SCALE = 0.055;
const DEFAULT_NOISE_SCALE = 1.8;
const DEFAULT_NOISE_OCTAVES = 4;
const DEFAULT_SEED = 1;

/** Options used to generate a low-poly minor planet mesh. */
export interface MinorPlanetGeometryOptions {
    /** Base radius of the minor planet before height displacement. */
    readonly radius?: number;

    /** Number of subdivisions used by the source icosahedron. */
    readonly details?: number;

    /** Height displacement as a fraction of the radius. */
    readonly heightScale?: number;

    /** Frequency of the first Simplex noise octave. */
    readonly noiseScale?: number;

    /** Number of Simplex noise octaves blended into the heightmap. */
    readonly noiseOctaves?: number;

    /** Deterministic seed used to shuffle the Simplex noise gradients. */
    readonly seed?: number;
}

/**
 * Creates an icosahedron-based minor planet displaced by seeded Simplex noise.
 *
 * @param options The options used to generate the low-poly body.
 * @returns The generated minor planet geometry.
 */
export function createMinorPlanetGeometry(options: MinorPlanetGeometryOptions = {}): BufferGeometry {
    const radius = options.radius ?? DEFAULT_RADIUS;
    const details = options.details ?? DEFAULT_DETAILS;
    const heightScale = options.heightScale ?? DEFAULT_HEIGHT_SCALE;
    const noiseScale = options.noiseScale ?? DEFAULT_NOISE_SCALE;
    const noiseOctaves = options.noiseOctaves ?? DEFAULT_NOISE_OCTAVES;
    const seed = options.seed ?? DEFAULT_SEED;

    const baseGeometry = new IcosahedronGeometry(radius, details);
    const basePosition = baseGeometry.getAttribute("position");
    const displacedPosition = new Float32Array(basePosition.count * 3);
    const direction = new Vector3();
    const noise = createSimplexNoiseSampler(seed);

    for (let i = 0; i < basePosition.count; i++) {
        direction.fromBufferAttribute(basePosition, i).normalize();

        const height = sampleLayeredSimplexNoise(noise, direction.x, direction.y, direction.z, {
            octaves: noiseOctaves,
            scale: noiseScale
        });
        direction.multiplyScalar(radius * (1 + height * heightScale));

        displacedPosition[i * 3] = direction.x;
        displacedPosition[i * 3 + 1] = direction.y;
        displacedPosition[i * 3 + 2] = direction.z;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(displacedPosition, 3));
    geometry.computeVertexNormals();

    baseGeometry.dispose();

    return geometry;
}
