/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { expect, it } from "vitest";
import { brand } from "@/lib/utils";
import { degreesToRadians } from "@/lib/math";
import { getMeanAnomaly } from "./mean-anomaly";
import { getEccentricAnomaly } from "./eccentric-anomaly";
import { Earth } from "@/data";

it("returns the eccentric anomaly at the epoch", () => {
    expect(
        getEccentricAnomaly(
            getMeanAnomaly(
                Earth.orbit.epoch,
                Earth.orbit.epoch,
                Earth.orbit.orbitalPeriod,
                degreesToRadians(Earth.orbit.meanAnomaly)
            ),
            Earth.orbit.eccentricity
        )
    ).toBeCloseTo(3.1380398677035863e0, 12);
});

it("returns the correct eccentric anomaly at the epoch + 1/4 period", () => {
    expect(
        getEccentricAnomaly(
            getMeanAnomaly(
                brand(Earth.orbit.epoch + Earth.orbit.orbitalPeriod / 4),
                Earth.orbit.epoch,
                Earth.orbit.orbitalPeriod,
                degreesToRadians(Earth.orbit.meanAnomaly)
            ),
            Earth.orbit.eccentricity
        )
    ).toBeCloseTo(-1.5912365092668985e0, 12);
});
