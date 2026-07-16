#!/bin/env bun

/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { createRandomGenerator } from "@/lib/math";

import {
    confirmSmallBodyGeneration,
    formatSmallBodyTitle,
    parseNewPlanetCliOptions,
    selectSmallBodyFromCandidates,
    withSpinner
} from "./cli";
import { readExistingPlanetDesignations } from "./toml";
import { getSmallBodyCitation, queryRandomSmallBodyCandidates } from "./jpl-ssd-api";


const options = parseNewPlanetCliOptions(Bun.argv.slice(2));
const generator = createRandomGenerator(options.seed);
let isSearching = true;
const existingDesignations = await readExistingPlanetDesignations();

while (isSearching) {
    const candidates = await withSpinner({
        start: `Fetching ${options.count.toString(10)} named main-belt bodies from JPL SBDB...`,
        success: `Fetched ${options.count.toString(10)} named main-belt bodies.`
    }, async function fetchCandidates() {
        return queryRandomSmallBodyCandidates({
            count: options.count,
            generator,
            excluded: existingDesignations
        });
    });

    const selected = await selectSmallBodyFromCandidates(candidates);
    if (selected === "reroll") {
        continue;
    }

    const citation = await withSpinner({
        start: `Fetching naming citation for ${formatSmallBodyTitle(selected)}...`,
        success: "Fetched naming citation."
    }, async function fetchCitation() {
        return getSmallBodyCitation(selected.designation);
    });

    const action = await confirmSmallBodyGeneration(selected, citation, { dryRun: options.dryRun });
    if (action === "search-again") {
        continue;
    }
    if (action === "cancel") {
        console.log("Generation cancelled.");
        process.exit(1);
    }

    isSearching = false;
}
