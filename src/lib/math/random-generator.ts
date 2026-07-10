/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


const DEFAULT_RANDOM_GENERATOR_SEED = 1;
const FNV_OFFSET_BASIS = 0x811c9dc5;
const FNV_PRIME = 0x01000193;
const SEED_STEP = 0x9e3779b9;
const UINT32_RANGE = 0x100000000;

/** Seed accepted by the random generator factory. */
export type RandomGeneratorSeed = number | string;

/** Callable SFC32-backed pseudo-random number generator. */
export interface RandomGenerator {
    /** Samples the next value in the `[0, 1)` range. */
    (): number;

    /** The pseudo-random number generator algorithm. */
    readonly algorithm: "sfc32";

    /** Seed used to initialise the generator state. */
    readonly seed: RandomGeneratorSeed;

    /** Samples the next value in the `[0, 1)` range. */
    readonly next: () => number;

    /** Samples the next unsigned 32-bit integer. */
    readonly nextUint32: () => number;
}

/**
 * Creates a callable SFC32-backed pseudo-random number generator.
 *
 * @param seed The seed used to initialise the generator state.
 * @returns A callable random generator object.
 */
export function createRandomGenerator(seed: RandomGeneratorSeed = DEFAULT_RANDOM_GENERATOR_SEED): RandomGenerator {
    let [a, b, c, d] = createInitialState(seed);

    function nextUint32(): number {
        const result = (a + b + d) >>> 0;

        d = (d + 1) >>> 0;
        a = (b ^ (b >>> 9)) >>> 0;
        b = (c + (c << 3)) >>> 0;
        c = ((c << 21) | (c >>> 11)) >>> 0;
        c = (c + result) >>> 0;

        return result;
    }

    function random(): number {
        return nextUint32() / UINT32_RANGE;
    }

    return Object.defineProperties(random, {
        algorithm: {
            enumerable: true,
            value: "sfc32"
        },
        next: {
            enumerable: true,
            value: random
        },
        nextUint32: {
            enumerable: true,
            value: nextUint32
        },
        seed: {
            enumerable: true,
            value: seed
        }
    }) as RandomGenerator;
}

function createInitialState(seed: RandomGeneratorSeed): [number, number, number, number] {
    const initialState: [number, number, number, number] = [0, 0, 0, 0];
    let state = hashSeed(seed);

    for (let index = 0; index < initialState.length; index++) {
        state = (state + SEED_STEP) >>> 0;
        initialState[index] = mixSeed(state);
    }

    return initialState;
}

function hashSeed(seed: RandomGeneratorSeed): number {
    if (typeof seed === "number") {
        if (!Number.isFinite(seed)) {
            throw new RangeError("RandomGenerator seed must be a finite number.");
        }

        return Math.trunc(seed) >>> 0;
    }

    let hash = FNV_OFFSET_BASIS;

    for (let index = 0; index < seed.length; index++) {
        hash ^= seed.charCodeAt(index);
        hash = Math.imul(hash, FNV_PRIME);
    }

    return hash >>> 0;
}

function mixSeed(value: number): number {
    let mixed = value;
    mixed = Math.imul(mixed ^ (mixed >>> 16), 0x21f0aaad);
    mixed = Math.imul(mixed ^ (mixed >>> 15), 0x735a2d97);

    return (mixed ^ (mixed >>> 15)) >>> 0;
}
