/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import {
    createSimplexNoiseSampler,
    sampleLayeredSimplexNoise,
    type LayeredSimplexNoiseOptions,
    type SimplexNoiseSampler
} from "@/lib/math/simplex-noise";


/** @deprecated Use {@link SimplexNoiseSampler}. */
export type PerlinNoiseSampler = SimplexNoiseSampler;

/** @deprecated Use {@link LayeredSimplexNoiseOptions}. */
export type LayeredPerlinNoiseOptions = LayeredSimplexNoiseOptions;

/** @deprecated Use {@link createSimplexNoiseSampler}. */
export const createPerlinNoiseSampler = createSimplexNoiseSampler;

/** @deprecated Use {@link sampleLayeredSimplexNoise}. */
export const sampleLayeredPerlinNoise = sampleLayeredSimplexNoise;
