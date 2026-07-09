/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { Glob, TOML, file } from "bun";
import { fetchHorizonsAPIOrbitalParameters } from "@/config/jpl-ssd-parser/api";
import { writeOrbitalParametersToTomlFile } from "@/config/jpl-ssd-parser/toml-writer";

/**
 * Updates all the orbital data found in the `src/data/planets` files.
 *
 * Queries the Jet Propulsion Laboratory's Horizons System to retrieve the latest orbital data for each planet.
 *
 * @returns A promise that resolves when the orbital data has been updated.
 */
async function updatePlanetOrbitData() {
    for await (const path of new Glob("src/data/planets/*.toml").scan()) {
        const target = file(path);
        const data = TOML.parse(await target.text());
        if (!("designation" in data) || typeof data.designation !== "string") {
            throw new Error(`Missing planet designation in "${path}"`);
        }

        const { source, parameters } = await fetchHorizonsAPIOrbitalParameters(data.designation);

        await writeOrbitalParametersToTomlFile(target, parameters, source);
    }
}

await updatePlanetOrbitData();
