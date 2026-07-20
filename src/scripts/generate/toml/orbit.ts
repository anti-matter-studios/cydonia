/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { BunFile } from "bun";

import type { OrbitalParameters, PlanetDataSource } from "@/lib/schemas";

import { formatTomlAssignment } from "./format";


/** Rewrites only the generated orbit/source blocks in a planet descriptor TOML file. */
export async function writeOrbitalParametersToTomlFile(
    target: BunFile,
    parameters: OrbitalParameters,
    source: PlanetDataSource
): Promise<void> {
    const preservedText = removeGeneratedOrbitBlocks(await target.text());

    await target.write(`${preservedText}\n\n${formatOrbitalParametersToml(parameters, source)}`);
}

/** Formats orbital parameters and source metadata as TOML sections. */
export function formatOrbitalParametersToml(parameters: OrbitalParameters, source: PlanetDataSource): string {
    return [
        "[orbit]",
        formatTomlAssignment("epoch", parameters.epoch),
        formatTomlAssignment("eccentricity", parameters.eccentricity),
        formatTomlAssignment("meanAnomaly", parameters.meanAnomaly),
        formatTomlAssignment("semiMajorAxis", parameters.semiMajorAxis),
        formatTomlAssignment("orbitalPeriod", parameters.orbitalPeriod),
        "",
        "[orbit.units]",
        formatTomlAssignment("time", parameters.units.time),
        formatTomlAssignment("distance", parameters.units.distance),
        formatTomlAssignment("angle", parameters.units.angle),
        "",
        "[orbit.angles]",
        formatTomlAssignment("inclination", parameters.angles.inclination),
        formatTomlAssignment("longitudeOfAscendingNode", parameters.angles.longitudeOfAscendingNode),
        formatTomlAssignment("argumentOfPeriapsis", parameters.angles.argumentOfPeriapsis),
        "",
        "[source]",
        formatTomlAssignment("time", source.time),
        formatTomlAssignment("name", source.name),
        "",
        "[source.data]",
        ...Object.entries(source.data).map(([key, value]) => formatTomlAssignment(key, value, true))
    ].join("\n") + "\n";
}

function removeGeneratedOrbitBlocks(source: string): string {
    const lines: string[] = [];
    let isInGeneratedBlock = false;

    for (const line of source.split("\n")) {
        if (line.startsWith("[orbit") || line.startsWith("[source")) {
            isInGeneratedBlock = true;
        } else if (line.startsWith("[")) {
            isInGeneratedBlock = false;
        }

        if (!isInGeneratedBlock) {
            lines.push(line);
        }
    }

    return lines.join("\n").trimEnd();
}
