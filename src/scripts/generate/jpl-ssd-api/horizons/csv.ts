/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import type { HorizonsApiEphemeris } from "./ephemeris";


/**
 * Parses the data found in an ephemeris' CSV line.
 *
 * @param data The data to parse.
 * @returns The parsed payload.
 */
export function parseEphemerisCSV(data: string): HorizonsApiEphemeris {
    return validateEphemerisData(
        Object.fromEntries(
            data.split(",").map(function parseItem(item, index) {
                return [EPHEMERIS_KEY_ORDER[index], item];
            })
        )
    );
}


/** Checks if a given ephemeris is valid data. */
function validateEphemerisData(data: Record<string, string>): HorizonsApiEphemeris {
    type WritableHorizonsApiEphemeris = { -readonly [K in keyof HorizonsApiEphemeris]?: HorizonsApiEphemeris[K] };
    const ephemeris: WritableHorizonsApiEphemeris = {};
    for (const key of EPHEMERIS_KEY_ORDER) {
        if (!data[key]) {
            throw new Error(`Invalid ephemeris data: Missing key "${key}".`);
        }

        switch (key) {
        case "TDB":
            ephemeris[key] = data[key].trim();
            break;
        default:
            (ephemeris as Record<string, number>)[key] = parseFloat(data[key].trim());
            break;
        }
    }

    return Object.seal(ephemeris) as HorizonsApiEphemeris;
}

/** Order of the keys in the CSV data returned by the Horizons API. */
const EPHEMERIS_KEY_ORDER: ReadonlyArray<keyof HorizonsApiEphemeris> = [
    "JD", "TDB", "EC", "QR", "IN", "OM", "W", "Tp", "N", "MA", "TA", "A", "AD", "PR"
] as const;
