/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { Glob, TOML, type BunFile, file } from "bun";
import { resolve } from "node:path";

import { PLANET_DATA_DIRECTORY } from "@/scripts/generate/toml/paths";
import { isPlanetData } from "@/lib/schemas";


/**
 * Discovers all the planet-data TOML files.
 *
 * Validates the data found within with the planet data schema before returning them.
 * If the data is invalid, a warning will be logged.
 *
 * @returns A list of all the valid planet data TOML files.
 */
export async function *discoverPlanetTomlFiles(): AsyncGenerator<BunFile> {
    for await (const filepath of new Glob("*.toml").scan(PLANET_DATA_DIRECTORY)) {
        const bunFile = file(resolve(PLANET_DATA_DIRECTORY, filepath));
        const parsed: unknown = TOML.parse(await bunFile.text());

        if (!isPlanetData(parsed)) {
            console.warn("The file %s does not contain valid planet data", filepath);
            console.warn("Errors:");
            for (const error of isPlanetData.errors ?? []) {
                console.warn(error);
            }
            continue;
        }

        yield bunFile;
    }
}
