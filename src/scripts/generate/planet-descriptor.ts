/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { RandomGenerator } from "@/lib/math";
import type { OrbitalParameters, PlanetData, PlanetDataSource } from "@/lib/schemas";

import { createMinorPlanetAppearance } from "./planet-mesh";


export interface MinorPlanetDescriptorOptions {
    readonly designation: string;
    readonly name: string;
    readonly orbit: OrbitalParameters;
    readonly source: PlanetDataSource;
    readonly generator: RandomGenerator;
}

/** Assembles a complete TOML-ready minor-planet descriptor around real orbit data. */
export function createMinorPlanetDescriptor(options: MinorPlanetDescriptorOptions): PlanetData {
    const appearance = createMinorPlanetAppearance(options.generator);

    return {
        designation: options.designation,
        name: options.name,
        mesh: appearance.mesh,
        rotation: appearance.rotation,
        orbit: options.orbit,
        source: options.source
    };
}
