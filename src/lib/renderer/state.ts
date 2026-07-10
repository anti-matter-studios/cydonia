/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { PlanetData } from "@/lib/schemas";
import { type JulianDaysTDB, type UnixTimestampUTC } from "@/lib/math";


/** Global state of the simulation. */
export interface SimulationState {
    /** The wall clock time of the simulation, as a number of UTC milliseconds since the Unix epoch. */
    readonly wallClockUTC: UnixTimestampUTC;

    /** The wall clock time as a number of Barycentric Dynamical Time Julian Days. */
    readonly wallClockJD: JulianDaysTDB;

    /** A list of all the bodies tracked in the current simulation, indexed by their designation. */
    readonly bodies: Record<string, PlanetData>;
}
