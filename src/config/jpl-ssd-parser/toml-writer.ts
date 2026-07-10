/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { BunFile } from "bun";
import type { OrbitalParameters, PlanetDataSource } from "@/lib/schemas";


/**
 * Updates a TOML file with the provided orbital parameters and source data.
 *
 * @param file The file to update.
 * @param parameters The parameters to update the TOML file with.
 * @param source The source data for the orbital parameters.
 * @returns A promise that resolves with the updated data.
 */
export async function writeOrbitalParametersToTomlFile(
    file: BunFile,
    parameters: OrbitalParameters,
    source: PlanetDataSource
) {
    let updatedText = "";

    // Clean up any existing fields in the source file.
    let isInDeletedBlock = false;
    for (const line of (await file.text()).split("\n")) {
        if (line.startsWith("[orbit") || line.startsWith("[source")) {
            isInDeletedBlock = true;
        } else if (line.startsWith("[")) {
            isInDeletedBlock = false;
        }

        if (!isInDeletedBlock) {
            updatedText += line + "\n";
        }
    }

    // Write the data to the file.
    updatedText += "[orbit]\n";
    updatedText += `epoch = ${parameters.epoch.toFixed()}\n`;
    updatedText += `eccentricity = ${parameters.eccentricity.toExponential()}\n`;
    updatedText += `meanAnomaly = ${parameters.meanAnomaly}\n`;
    updatedText += `semiMajorAxis = ${parameters.semiMajorAxis}\n`;
    updatedText += `orbitalPeriod = ${parameters.orbitalPeriod}\n`;
    updatedText += "\n[orbit.units]\n";
    updatedText += `time = "${parameters.units.time}"\n`;
    updatedText += `distance = "${parameters.units.distance}"\n`;
    updatedText += `angle = "${parameters.units.angle}"\n`;
    updatedText += "\n[orbit.angles]\n";
    updatedText += `inclination = ${parameters.angles.inclination}\n`;
    updatedText += `longitudeOfAscendingNode = ${parameters.angles.longitudeOfAscendingNode}\n`;
    updatedText += `argumentOfPerihelion = ${parameters.angles.argumentOfPerihelion}\n`;
    updatedText += "\n[source]\n";
    updatedText += `time = "${source.time}"\n`;
    updatedText += `name = "${source.name}"\n`;
    updatedText += "\n[source.data]\n";
    for (const [key, value] of Object.entries(source.data)) {
        if (typeof value === "string") {
            updatedText += `${key} = "${value}"\n`;
        } else if (typeof value === "number") {
            updatedText += `${key} = ${value.toExponential()}\n`;
        } else if (value instanceof Date) {
            updatedText += `${key} = "${value.toISOString()}"\n`;
        } else {
            updatedText += `${key} = "${JSON.stringify(value)}"\n`;
        }
    }

    await file.write(updatedText);
}