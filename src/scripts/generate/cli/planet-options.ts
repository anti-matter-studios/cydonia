/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { RandomGeneratorSeed } from "@/lib/math";


const DEFAULT_CANDIDATE_COUNT = 25;

/** Options accepted by the interactive minor-planet generator. */
export interface NewPlanetCliOptions {
    /** Number of random named minor planets to fetch for each picker round. */
    readonly count: number;

    /** Seed used to make random candidate selection repeatable. */
    readonly seed?: RandomGeneratorSeed;

    /** Preview the selected body without writing generated project data. */
    readonly dryRun: boolean;
}

/** Parses command-line arguments for the interactive minor-planet generator. */
export function parseNewPlanetCliOptions(args: readonly string[]): NewPlanetCliOptions {
    let options: NewPlanetCliOptions = {
        count: DEFAULT_CANDIDATE_COUNT,
        dryRun: false
    };

    for (let index = 0; index < args.length; index++) {
        const arg = args[index] ?? "";

        if (arg === "--help" || arg === "-h") {
            printNewPlanetHelp();
            process.exit(0);
        }
        if (arg === "--dry-run") {
            options = { ...options, dryRun: true };
            continue;
        }

        const count = readOptionValue(args, index, arg, "--count", "-n");
        if (count !== null) {
            options = { ...options, count: parseCandidateCount(count.value) };
            index = count.nextIndex;
            continue;
        }

        const seed = readOptionValue(args, index, arg, "--seed", "-s");
        if (seed !== null) {
            options = { ...options, seed: parseGeneratorSeed(seed.value) };
            index = seed.nextIndex;
            continue;
        }

        throw new Error(`Unknown argument "${arg}". Use --help for usage.`);
    }

    return options;
}

function readOptionValue(
    args: readonly string[],
    index: number,
    arg: string,
    longName: string,
    shortName: string
): { readonly value: string; readonly nextIndex: number } | null {
    for (const name of [longName, shortName]) {
        const prefix = `${name}=`;
        if (arg.startsWith(prefix)) {
            return { value: arg.slice(prefix.length), nextIndex: index };
        }
        if (arg === name) {
            if (index + 1 >= args.length) {
                throw new Error(`Missing value for ${name}.`);
            }

            return { value: args[index + 1], nextIndex: index + 1 };
        }
    }

    return null;
}

function parseCandidateCount(value: string): number {
    const parsed = Number(value);

    if (!Number.isInteger(parsed) || parsed < 1) {
        throw new Error(`Candidate count must be a positive integer. Received "${value}".`);
    }

    return parsed;
}

function parseGeneratorSeed(value: string): RandomGeneratorSeed {
    if (value.length === 0) {
        throw new Error("Generator seed must not be empty.");
    }

    const parsed = Number(value);

    return Number.isFinite(parsed) && value.trim().length > 0 ? parsed : value;
}

function printNewPlanetHelp(): void {
    console.log(`Generate a new minor-planet project descriptor.

Usage:
  bun run generate:minor-planet [options]

Options:
  -n, --count <number>  Number of random named bodies to show per picker round.
  -s, --seed <seed>     Seed used for deterministic random selection.
  --dry-run            Preview the selected body without writing generated files.
  -h, --help           Show this help message.`);
}
