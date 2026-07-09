/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { Temporal } from "@js-temporal/polyfill";
import type { OrbitalParameters, PlanetDataSource } from "@/lib/schemas";
import { brand } from "@/lib/utils";


/** Base url for the calls made to the Horizons API. */
const HORIZONS_API_URL = new URL("https://ssd.jpl.nasa.gov/api/horizons.api");

/**
 * Retrieves the orbital parameters for a given designation from the Jet Propulsion Laboratory's Horizons System.
 *
 * @param designation The designation of the celestial body for which to retrieve orbital parameters.
 * @returns The orbital parameters for the specified designation.
 */
export async function fetchHorizonsAPIOrbitalParameters(designation: string) {
    const now = Temporal.Now.plainDateTimeISO("UTC");
    const today = Temporal.PlainDate.from(now);
    const tomorrow = today.add({ days: 1 });

    const url = new URL(HORIZONS_API_URL);
    url.searchParams.set("format", "text");
    url.searchParams.set("command", designation);
    url.searchParams.set("obj_data", "no");
    url.searchParams.set("make_ephem", "yes");
    url.searchParams.set("ephem_type", "elements");
    url.searchParams.set("center", "10");
    url.searchParams.set("step_size", "1day");
    url.searchParams.set("start_time", `'${today.toString()} 12:00'`);
    url.searchParams.set("stop_time", `'${tomorrow.toString()} 12:00'`);
    url.searchParams.set("out_units", `AU-D`);

    const response = await fetch(url);
    if (!response.ok) {
        console.error("Got a %d response from the Horizons API when fetching %s", response.status, designation);
        console.error(await response.text());
        throw new Error(`Failed to retrieve orbital data for ${designation}`);
    }

    // Validate the response payload.
    let payload = await response.text();
    if (!payload.startsWith("API VERSION: ")) {
        throw new Error("Expected an API version in the response payload");
    }
    const apiVersion = payload.slice("API VERSION: ".length, payload.indexOf("\n"));
    payload = payload.slice(payload.indexOf("\n") + 1);
    if (!payload.startsWith("API SOURCE: ")) {
        throw new Error("Expected an API source in the response payload");
    }
    const apiSource = payload.slice("API SOURCE: ".length, payload.indexOf("\n"));
    payload = payload.slice(payload.indexOf("\n") + 1);

    const ephemeris = parseHorizonEphemeris(payload);
    const source: PlanetDataSource = { time: now.toString(), data: ephemeris, name: `${apiSource}v${apiVersion}` };
    return { source, parameters: ephemerisToOrbitalParameters(ephemeris) };
}

/** Data that was extracted from a single ephemeris element. */
interface Ephemeris {
    dateJD: number;
    dateUTC: string;
    EC: number;
    QR: number;
    IN: number;
    OM: number;
    W: number;
    Tp: number;
    N: number;
    MA: number;
    TA: number;
    A: number;
    AD: number;
    PR: number;
}

/**
 * Parses the entire ephemeris text returned by the Horizons API.
 *
 * Seeks for "$$SOE" and "$$EOE" markers to identify the start and end of the ephemeris data.
 *
 * @param text The text to parse.
 * @returns The parsed parameters.
 */
function parseHorizonEphemeris(text: string): Ephemeris {
    const soeIndex = text.indexOf("$$SOE");
    const eoeIndex = text.indexOf("$$EOE");
    if (soeIndex === -1 || eoeIndex === -1) {
        throw new Error("Failed to find $$SOE and $$EOE markers in the ephemeris text.");
    }
    const lines = text.slice(soeIndex + "$$SOE".length + 1, eoeIndex).split("\n");

    // Get the date from the text.
    const dateEndIndex = lines[0].indexOf("=");
    const dateJD = parseFloat(lines[0].slice(0, dateEndIndex));
    const dateUTC = lines[0].slice(dateEndIndex + 1).trim();

    // Parse the rest of the data.
    const data: Ephemeris = {
        dateJD,
        dateUTC,
        EC: 0,
        QR: 0,
        IN: 0,
        OM: 0,
        W: 0,
        Tp: 0,
        N: 0,
        MA: 0,
        TA: 0,
        A: 0,
        AD: 0,
        PR: 0
    };
    for (const line of lines.slice(1, 5)) {
        for (let column = 0; column < 3; column++) {
            const [key, value] = line.slice(column * 26, (column + 1) * 26).split("=");
            data[key.trim() as keyof Omit<Ephemeris, "dateJD" | "dateUTC">] = parseFloat(value.trim());
        }
    }

    return data;
}

/** Converts the given ephemeris to {@link OrbitalParameters}. */
function ephemerisToOrbitalParameters(ephemeris: Ephemeris): OrbitalParameters {
    return {
        epoch: brand(ephemeris.dateJD),
        eccentricity: ephemeris.EC,
        angles: {
            inclination: brand(ephemeris.IN),
            longitudeOfAscendingNode: brand(ephemeris.OM),
            argumentOfPerihelion: brand(ephemeris.W)
        },
        orbitalPeriod: brand(ephemeris.PR),
        meanAnomaly: brand(ephemeris.MA),
        semiMajorAxis: brand(ephemeris.A),
        units: {
            angle: "degrees",
            distance: "astronomical-units",
            time: "julian-date-barycentric-dynamical-time-days"
        }
    };
}