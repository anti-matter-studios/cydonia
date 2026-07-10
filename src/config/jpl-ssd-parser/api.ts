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

    const url = new URL(HORIZONS_API_URL);
    url.searchParams.set("format", "text");
    url.searchParams.set("csv_format", "yes");
    url.searchParams.set("command", designation);
    url.searchParams.set("obj_data", "no");
    url.searchParams.set("make_ephem", "yes");
    url.searchParams.set("ephem_type", "elements");
    url.searchParams.set("center", "10");
    url.searchParams.set("step_size", "1day");
    url.searchParams.set("start_time", `'${today.toString()} 12:00'`);
    url.searchParams.set("stop_time", `'${today.toString()} 13:00'`);
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

/**
 * Parses the entire ephemeris text returned by the Horizons API.
 *
 * Seeks for "$$SOE" and "$$EOE" markers to identify the start and end of the ephemeris data.
 *
 * @param text The text to parse.
 * @returns The parsed parameters.
 */
function parseHorizonEphemeris(text: string) {
    const soeIndex = text.indexOf("$$SOE");
    const eoeIndex = text.indexOf("$$EOE");
    if (soeIndex === -1 || eoeIndex === -1) {
        throw new Error("Failed to find $$SOE and $$EOE markers in the ephemeris text.");
    }

    // Parse the data as comma-separated.
    const [JD, UTC, EC, QR, IN, OM, W, Tp, N, MA, TA, A, AD, PR] = text.slice(soeIndex + 6, eoeIndex).split(",");

    // Parse the rest of the data.
    return {
        JD: parseFloat(JD.trim()),
        UTC,
        EC: parseFloat(EC.trim()),
        QR: parseFloat(QR.trim()),
        IN: parseFloat(IN.trim()),
        OM: parseFloat(OM.trim()),
        W: parseFloat(W.trim()),
        Tp: parseFloat(Tp.trim()),
        N: parseFloat(N.trim()),
        MA: parseFloat(MA.trim()),
        TA: parseFloat(TA.trim()),
        A: parseFloat(A.trim()),
        AD: parseFloat(AD.trim()),
        PR: parseFloat(PR.trim())
    };
}

/** Converts the given ephemeris to {@link OrbitalParameters}. */
function ephemerisToOrbitalParameters(ephemeris: ReturnType<typeof parseHorizonEphemeris>): OrbitalParameters {
    return {
        epoch: brand(ephemeris.JD),
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
