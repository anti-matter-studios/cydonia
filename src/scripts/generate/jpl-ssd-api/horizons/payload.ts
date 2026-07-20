/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { HorizonsApiEphemeris } from "./ephemeris";
import { parseEphemerisCSV } from "./csv";


/** Payload queried from the Horizons API. */
export interface HorizonsApiEphemerisPayload {
    /** The version of the API that was queried. */
    readonly apiVersion: string;
    /** The name of the source API that generated the ephemeris data. */
    readonly apiSource: string;
    /** The ephemeris that was parsed from the CSV data. */
    readonly ephemeris: HorizonsApiEphemeris;
}

/**
 * Parses a given ephemeris text payload from the Horizons API.
 *
 * @param data The data to parse.
 * @returns The parsed payload.
 */
export function parseEphemerisPayload(data: string): HorizonsApiEphemerisPayload {
    // Validate the API source and version.
    const version = readHeaderLine(data, "API VERSION:");
    data = version.rest;

    const source = readHeaderLine(data, "API SOURCE:");
    data = source.rest;

    // Seek the "$$SOE" and "$$EOE" markers.
    const ephemerisStartMarker = data.indexOf("$$SOE");
    const ephemerisEndMarker = data.indexOf("$$EOE");
    if (ephemerisStartMarker === -1 || ephemerisEndMarker === -1) {
        throw new Error("Invalid Horizons API payload: Missing `$$SOE` or `$$EOE` markers.");
    }
    if (ephemerisEndMarker <= ephemerisStartMarker) {
        throw new Error("Invalid Horizons API payload: `$$EOE` marker must come after `$$SOE` marker.");
    }

    return {
        apiVersion: version.value,
        apiSource: source.value,
        ephemeris: parseEphemerisCSV(data.slice(ephemerisStartMarker + 5, ephemerisEndMarker).trim()),
    };
}

function readHeaderLine(data: string, header: string): { readonly value: string; readonly rest: string } {
    if (!data.startsWith(header)) {
        throw new Error(`Invalid Horizons API payload: Missing \`${header}\` header.`);
    }

    const lineBreak = data.indexOf("\n");
    const line = lineBreak === -1 ? data : data.slice(0, lineBreak);
    const rest = lineBreak === -1 ? "" : data.slice(lineBreak + 1);

    return {
        value: line.slice(header.length).trim(),
        rest
    };
}
