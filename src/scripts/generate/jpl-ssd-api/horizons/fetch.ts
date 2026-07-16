/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { Temporal } from "@js-temporal/polyfill";
import { type HorizonsApiEphemerisPayload, parseEphemerisPayload } from "./payload";


/**
 * Fetches the Horizons API to retrieve an ephemeris for a given designation.
 *
 * @param designation The designation of the object to retrieve an ephemeris for.
 * @returns A promise that resolves with the Horizons API ephemeris payload.
 */
export async function fetchHorizonsApiEphemeris(designation: string): Promise<HorizonsApiEphemerisPayload> {
    const url = new URL(HORIZONS_API_URL);
    url.searchParams.set("command", designation);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch Horizons API ephemeris for ${designation}`);
    }

    return parseEphemerisPayload(await response.text());
}

const TODAY = Temporal.Now.plainDateISO();

// Prepared URL for the script.
const HORIZONS_API_URL = new URL("https://ssd.jpl.nasa.gov/api/horizons.api");
HORIZONS_API_URL.searchParams.set("format", "text");
HORIZONS_API_URL.searchParams.set("csv_format", "yes");
HORIZONS_API_URL.searchParams.set("obj_data", "no");
HORIZONS_API_URL.searchParams.set("make_ephem", "yes");
HORIZONS_API_URL.searchParams.set("ephem_type", "elements");
HORIZONS_API_URL.searchParams.set("center", "10");
HORIZONS_API_URL.searchParams.set("step_size", "1day");
HORIZONS_API_URL.searchParams.set("start_time", `'${TODAY.toString()} 12:00'`);
HORIZONS_API_URL.searchParams.set("stop_time", `'${TODAY.toString()} 13:00'`);
HORIZONS_API_URL.searchParams.set("out_units", "AU-D");