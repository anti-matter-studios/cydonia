/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { OrbitalParameters, PlanetMesh } from "@/lib/schemas";
import type { Degrees } from "@/lib/math";

import PlanetDataSchema from "./planet.schema.json";


/** Object used to describe the source of a planet's orbit data. */
export interface PlanetDataSource {
    /** The time at which the data was extracted. */
    time: string;

    /** The name of the source. */
    name: string;

    /** The data used as a source. */
    data: object;
}

/** Information regarding the spin of the planet around its axis. */
export interface PlanetRotation {
    /** The tilt angle of the planet around the Y axis. */
    tilt: Degrees;

    /** The rate of rotation, in degrees per day. */
    rate: Degrees;
}

/** Base interface used to describe the data of a given planet. */
export interface PlanetData {
    /** The official designation of the planet in the JPL SSD database. */
    designation: string;

    /** The name of the planet. */
    name: string;

    /** The parameters of the orbit. */
    orbit: OrbitalParameters;

    /** The mesh used to render the planet. */
    mesh: PlanetMesh;

    /** The rotation applied to the planet, if any. */
    rotation?: PlanetRotation;

    /** The source data used to extract the orbital parameters. */
    source: PlanetDataSource;
}

export { PlanetDataSchema };
