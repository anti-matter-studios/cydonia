/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { AjvInstance } from "@/lib/schemas";

import Schema from "./result.schema.json";
import type { ValidateFunction } from "ajv/dist/2020";

/** Shape of a response returned from the SBDB API when no fields are requested. */
export interface SBDBQueryCountOnlyResult {
    /** Signature used to validate the source. */
    readonly signature: SBDBSignature;
    /** The number of items that matched with the database. */
    readonly count: number;
}

/** Shape of a response returned from the SBDB API. */
export interface SBDBQueryResult extends SBDBQueryCountOnlyResult {
    /** List of fields included in the response, ordered. */
    readonly fields: readonly string[];
    /** List of bodies returned in the response. */
    readonly data: ReadonlyArray<ReadonlyArray<string|null>>;
}

/** Signature of the SBDB response. */
export interface SBDBSignature {
    /** The version of the API. */
    readonly version: string;
    /** The name of the source that generated the response. */
    readonly source: string;
}

const validate: ValidateFunction< Partial<SBDBQueryResult>> = AjvInstance.compile(Schema);

/** Checks if an object is a {@link SBDBQueryCountOnlyResult}. */
export function isSBDBQueryCountOnlyResult(response: unknown): response is SBDBQueryCountOnlyResult {
    if (!validate(response)) {
        return false;
    }

    return typeof response.fields === "undefined" && typeof response.data === "undefined";
}

/** Checks if an object is a {@link SBDBQueryResult}. */
export function isSBDBQueryResult(response: unknown): response is SBDBQueryResult {
    if (!validate(response)) {
        return false;
    }

    return typeof response.fields !== "undefined" && typeof response.data !== "undefined";
}