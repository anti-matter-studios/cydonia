/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import type { LayeredSimplexNoiseOptions, RandomGeneratorSeed } from "@/lib/math";

/** Options provided to the planet geometry builder. */
export interface PlanetGeometryOptions {
    /** Radius of the planet object, for the initial icosahedron subdivision. */
    radius?: number;

    /** Number of subdivisions applied to the icosahedron. */
    subdivisions?: number;

    /** Seed used for the simplex noise generators. */
    seed: RandomGeneratorSeed;

    /** Simplex parameters of the height displacement map. */
    height: LayeredSimplexNoiseOptions;
}
