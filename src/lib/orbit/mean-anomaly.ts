/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { asRadiansWrapped, type Radians, type DurationDays, type JulianDaysTDB } from "@/lib/math";


/**
 * Computes the mean anomaly of an orbit for a given timestamp.
 *
 * The result is normalised to the range `[0, 360(` degrees.
 *
 * @param targetTime The target time in terrestrial time Julian days.
 * @param epoch The epoch of the orbit in terrestrial time Julian days.
 * @param orbitalPeriod The orbital period of the orbit in terrestrial time Julian days.
 * @param meanAnomalyAtEpoch The mean anomaly of the orbit in degrees at its epoch time.
 * @returns The mean anomaly in degrees.
 */
export function getMeanAnomaly(
    targetTime: JulianDaysTDB,
    epoch: JulianDaysTDB,
    orbitalPeriod: DurationDays,
    meanAnomalyAtEpoch: Radians
): Radians {
    const elapsedOrbitalPeriods = (targetTime - epoch) / orbitalPeriod;
    return asRadiansWrapped(meanAnomalyAtEpoch + elapsedOrbitalPeriods * Math.PI * 2);
}
