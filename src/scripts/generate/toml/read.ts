/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { Glob, TOML, file, type BunFile } from "bun";
import { resolve } from "node:path";

import { PLANET_DATA_DIRECTORY } from "@/scripts/generate/toml/paths";
import { type PlanetData, isPlanetData } from "@/lib/schemas";


/** Reads existing designations so the picker avoids offering already tracked planets. */
export async function readExistingPlanetDesignations(): Promise<string[]> {
    const designations: string[] = [];

    for await (const filename of new Glob("*.toml").scan(PLANET_DATA_DIRECTORY)) {
        const source = await file(resolve(PLANET_DATA_DIRECTORY, filename)).text();
        const parsed: unknown = TOML.parse(source);

        if (isPlanetData(parsed)) {
            designations.push(parsed.designation);
        }
    }

    return designations;
}

/** Reads the JPL designation from a planet descriptor TOML file. */
export async function readPlanetData(target: BunFile): Promise<PlanetData> {
    const parsed: unknown = TOML.parse(await target.text());

    if (!isPlanetData(parsed)) {
        throw new Error(`Invalid planet data in "${target.name}".`);
    }

    return parsed;
}
