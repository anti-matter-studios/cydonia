/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type RandomGenerator, createRandomGenerator } from "@/lib/math";
import { parseSmallBodyObject, type SmallBody } from "../small-body";
import { getSmallBodyCandidatesCount } from "./count";
import { isSBDBQueryResult, } from "./result";


/** Options passed to the {@link queryRandomSmallBodyCandidates} function. */
export interface QueryRandomSmallBodyCandidatesOptions {
    /** The number of items to retrieve. */
    readonly count: number;

    /**
     * A maximum number of requests to make to the database.
     *
     * @default 10
     */
    readonly maxRequests?: number;

    /** The random generator used for deterministic behaviour. */
    readonly generator?: RandomGenerator;

    /**
     * The class of objects to retrieve.
     *
     * @default "MBA"
     */
    readonly objectClass?: string;

    /** Items to exclude from the response. */
    readonly excluded?: string[];
}

/**
 * Fetches a random sample of small bodies from the JPL Small-Body Database.
 *
 * @param count The number of small bodies to fetch.
 * @param maxRequests A maximum number of requests to make to the database.
 * @param generator The random generator used for deterministic behaviour.
 * @param objectClass The class of small body to fetch.
 * @param excluded The designations to exclude from the request.
 * @returns A list of small bodies that were queried from the server.
 */
export async function queryRandomSmallBodyCandidates(
    {
        count,
        maxRequests,
        generator = createRandomGenerator(),
        objectClass = "MBA",
        excluded = []
    }: QueryRandomSmallBodyCandidatesOptions
) {
    const total = await getSmallBodyCandidatesCount(objectClass);
    const requestLimit = maxRequests ?? Math.max(100, count * 8);

    const designations = new Map<string, SmallBody>();

    for (let i = 0; i < requestLimit; i++) {
        const { fields, data } = await querySmallBodyDatabase(objectClass, count, generator.nextRange(0, total));
        const bodies = data.map(data => parseSmallBodyObject(fields, data));
        for (const body of bodies) {
            if (excluded.includes(body.designation) || designations.has(body.designation)) {
                continue;
            }

            designations.set(body.designation, body);

            if (designations.size >= count) {
                // Shuffle the bodies before returning.
                return Array.from(designations.values()).sort(() => generator.nextRange(-1, 1));
            }
        }
    }

    throw new Error(`Failed to find ${count.toString(10)} candidates within ${requestLimit.toString(10)} requests.`);
}

/**
 * Executes a request to the Small Body Database API.
 *
 * @param objectClass The class of small body to fetch.
 * @param count The number of small bodies to fetch.
 * @param offset The offset to use for the request.
 * @returns A promise that resolves to a list of small bodies that were queried from the server.
 */
async function querySmallBodyDatabase(objectClass: string, count: number, offset: number) {
    const url = new URL(SBDB_URL);
    url.searchParams.set("sb-class", objectClass);
    url.searchParams.set("limit", Math.max(1, Math.round(count)).toString(10));
    url.searchParams.set("limit-from", Math.floor(offset).toString(10));

    const response = await fetch(url);
    const data = await response.json() as unknown;

    if (!isSBDBQueryResult(data)) {
        console.error(data);
        throw new Error("Invalid response from the Small Body DataBase.");
    }

    return data;
}

// Prepared URL for the script.
const SBDB_URL = new URL("https://ssd-api.jpl.nasa.gov/sbdb_query.api");
SBDB_URL.searchParams.set("fields", "pdes,full_name,name,class,a,e,diameter");
SBDB_URL.searchParams.set("sb-ns", "n");
SBDB_URL.searchParams.set("sb-kind", "a");
SBDB_URL.searchParams.set("sb-cdata", "{ \"AND\": [ \"name|DF\", \"name|RE|^D\" ] }");
