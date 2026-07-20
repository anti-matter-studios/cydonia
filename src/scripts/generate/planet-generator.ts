/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { file } from "bun";
import { resolve } from "node:path";

import type { RandomGenerator } from "@/lib/math";
import type { PlanetData } from "@/lib/schemas";
import type { SmallBody } from "@/scripts/generate/jpl-ssd-api";
import { PLANET_DATA_DIRECTORY, PLANET_MODULE_PATH } from "@/scripts/generate/toml/paths";
import { addMinorPlanetToPlanetIndex } from "@/scripts/generate/planet-index";
import { formatPlanetDescriptorToml, writePlanetDescriptorTomlFile } from "@/scripts/generate/toml/planet";


export interface GenerateMinorPlanetOptions {
    /** Random generator used for deterministic mesh and material values. */
    readonly generator: RandomGenerator;

    /** Preview generated output without writing descriptor or index files. */
    readonly dryRun: boolean;
}

export interface GeneratedMinorPlanetProject {
    /** Derived names used by the TOML descriptor and index entry. */
    readonly names: GeneratedPlanetNames;

    /** Absolute path to the descriptor file. */
    readonly targetPath: string;

    /** Full descriptor data generated for the selected body. */
    readonly descriptor: PlanetData;

    /** TOML text that will be written to disk. */
    readonly toml: string;
}

/** Generates a descriptor for a selected minor planet and writes it unless dry-run is enabled. */
export async function generateMinorPlanetProject(
    body: SmallBody,
    options: GenerateMinorPlanetOptions
): Promise<GeneratedMinorPlanetProject> {
    const names = createGeneratedPlanetNames(body);
    const targetPath = resolve(PLANET_DATA_DIRECTORY, names.filename);
    const target = file(targetPath);

    if (await target.exists()) {
        throw new Error(`Refusing to overwrite existing descriptor: ${targetPath}`);
    }

    const { parameters, source } = await fetchOrbitDataForDesignation(body.designation);
    const descriptor = {
        designation: options.designation,
        name: options.name,
        mesh: appearance.mesh,
        rotation: appearance.rotation,
        orbit: options.orbit,
        source: options.source
    };
    const toml = formatPlanetDescriptorToml(descriptor);

    if (!options.dryRun) {
        await writePlanetDescriptorTomlFile(target, descriptor);
        await addMinorPlanetToPlanetIndex({
            identifier: names.identifier,
            filename: names.filename
        });
    }

    return {
        names,
        targetPath,
        descriptor,
        toml
    };
}

/** Prints the write plan and descriptor body used by dry-run mode. */
export function printMinorPlanetDryRun(project: GeneratedMinorPlanetProject): void {
    console.log(`\nWould write ${project.targetPath}:\n`);
    console.log(project.toml);
    console.log(`Would add ${project.names.identifier} to ${PLANET_MODULE_PATH}.`);
}
