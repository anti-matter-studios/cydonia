#!/bin/env bun
/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { PlanetDataSource } from "@/lib/schemas";

import { withSpinner } from "./cli/spinner";
import { ephemerisToOrbitalParameters, fetchHorizonsApiEphemeris } from "./jpl-ssd-api";
import { readPlanetData, discoverPlanetTomlFiles, writeOrbitalParametersToTomlFile } from "./toml";


interface GenerateOrbitOptions {
    /** Fetch current orbit data without writing descriptor files. */
    readonly dryRun: boolean;
}

/** Runs the orbit-regeneration command. */
export async function runGenerateOrbitsCli(args = Bun.argv.slice(2)): Promise<void> {
    const options = parseGenerateOrbitOptions(args);
    const planetFiles = await Array.fromAsync(discoverPlanetTomlFiles());

    for (const [index, target] of planetFiles.entries()) {
        const { designation } = await readPlanetData(target);
        const progress = `[${(index + 1).toString()}/${planetFiles.length.toString()}]`;

        const { parameters, source } = await withSpinner({
            start: `${progress} Fetching Horizons orbit for ${designation}...`,
            success: `${progress} Fetched Horizons orbit for ${designation}.`
        }, async function fetchOrbit() {
            const { ephemeris, apiSource, apiVersion } = await fetchHorizonsApiEphemeris(designation);
            const source: PlanetDataSource = {
                name: `${apiSource}v${apiVersion}`,
                time: new Date().toISOString(),
                data: ephemeris
            };

            return { parameters: ephemerisToOrbitalParameters(ephemeris), source };
        });

        if (options.dryRun) {
            console.log(`${progress} Would update ${target.name} from ${source.name}.`);
            continue;
        }

        await withSpinner({
            start: `${progress} Writing ${target.name}...`,
            success: `${progress} Updated ${target.name}.`
        }, async function writeOrbit() {
            await writeOrbitalParametersToTomlFile(target, parameters, source);
        });
    }
}

function parseGenerateOrbitOptions(args: readonly string[]): GenerateOrbitOptions {
    return args.reduce<GenerateOrbitOptions>((options, arg) => {
        if (arg === "--help" || arg === "-h") {
            printHelp();
            process.exit(0);
        }
        if (arg === "--dry-run") {
            return { ...options, dryRun: true };
        }

        throw new Error(`Unknown argument "${arg}". Use --help for usage.`);
    }, { dryRun: false });
}

function printHelp(): void {
    console.log(`Regenerate orbital data for every planet descriptor.

Usage:
  bun run generate:orbits [options]

Options:
  --dry-run  Fetch current Horizons data without writing descriptor files.
  --help     Show this help message.`);
}

await runGenerateOrbitsCli();