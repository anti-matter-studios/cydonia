/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { isSBDBResult } from "./result";

/**
 * Fetches the citation provided for the naming of the given main belt asteroid.
 *
 * @param designation The designation to query for.
 * @returns The citation retrieved from the SBDB API.
 */
export async function getSmallBodyCitation(designation: string) {
    const url = new URL(SBDB_URL);
    url.searchParams.set("des", designation);

    const response = await fetch(url);
    const data = await response.json() as unknown;

    if (!isSBDBResult(data)) {
        console.log(url.toString());
        console.log(data);
        console.log(isSBDBResult.errors);
        throw new Error("Invalid response from the Small Body DataBase.");
    }

    return data.discovery.citation;
}

// Prepared URL for the script.
const SBDB_URL = new URL("https://ssd-api.jpl.nasa.gov/sbdb.api");
SBDB_URL.searchParams.set("discovery", "Y");