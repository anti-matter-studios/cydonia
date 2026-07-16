/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { ValidateFunction } from "ajv/dist/2020";
import { AjvInstance } from "@/lib/schemas";

import type { SBDBSignature } from "../query/result";
import Schema from "./result.schema.json";

/** Shape of a response returned from the SBDB API when no fields are requested. */
export interface SBDBResult {
    /** Signature used to validate the source. */
    readonly signature: SBDBSignature;
    /** Information about the discovery of the asteroid. */
    readonly discovery: SBDBDiscovery;
}

/** The information about the discovery of the asteroid. */
export interface SBDBDiscovery {
    /** The citation provided when the asteroid was discovered. */
    readonly citation: string | null;
}

/** Checks if an object is a {@link SBDBResult}. */
export const isSBDBResult: ValidateFunction<SBDBResult> = AjvInstance.compile(Schema);
