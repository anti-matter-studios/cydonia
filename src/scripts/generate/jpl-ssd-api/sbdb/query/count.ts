/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { isSBDBQueryCountOnlyResult } from "./result";

/**
 * Fetches the number of small body candidates found in the Small Body DataBase.
 *
 * @returns A promise that resolves with the number of small body candidates.
 */
export async function getSmallBodyCandidatesCount(objectClass: string): Promise<number> {
    const url = new URL(SBDB_URL);
    url.searchParams.set("sb-class", objectClass);
    const response = await fetch(url);
    const data = await response.json() as unknown;

    if (!isSBDBQueryCountOnlyResult(data)) {
        throw new Error("Invalid response from the Small Body DataBase.");
    }

    return data.count;
}

// Prepared URL for the script.
const SBDB_URL = new URL("https://ssd-api.jpl.nasa.gov/sbdb_query.api");
SBDB_URL.searchParams.set("sb-ns", "n");
SBDB_URL.searchParams.set("sb-kind", "a");
SBDB_URL.searchParams.set("sb-cdata", "{ \"AND\": [ \"name|DF\", \"name|RE|^D\" ] }");
