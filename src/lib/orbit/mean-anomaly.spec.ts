/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { expect, it } from "vitest";

import { getMeanAnomaly } from "./mean-anomaly";
import { asRadiansWrapped, degreesToRadians } from "@/lib/math";
import { brand } from "@/lib/utils";
import { Earth } from "@/data";


it("returns the epoch mean anomaly at the epoch", () => {
    expect(
        getMeanAnomaly(
            Earth.orbit.epoch,
            Earth.orbit.epoch,
            Earth.orbit.orbitalPeriod,
            degreesToRadians(Earth.orbit.meanAnomaly)
        )
    ).toBeCloseTo(degreesToRadians(Earth.orbit.meanAnomaly), 12);
});

it("returns the expected mean anomaly at half the epoch", () => {
    expect(
        getMeanAnomaly(
            brand(Earth.orbit.epoch + Earth.orbit.orbitalPeriod / 2),
            Earth.orbit.epoch,
            Earth.orbit.orbitalPeriod,
            degreesToRadians(Earth.orbit.meanAnomaly)
        )
    ).toBeCloseTo(asRadiansWrapped(degreesToRadians(Earth.orbit.meanAnomaly) + Math.PI), 10);
});

it("normalises forward times into [-Math.PI, 2 * Math.PI(", () => {
    expect(
        getMeanAnomaly(
            brand(Earth.orbit.epoch + Earth.orbit.orbitalPeriod),
            Earth.orbit.epoch,
            Earth.orbit.orbitalPeriod,
            degreesToRadians(Earth.orbit.meanAnomaly)
        )
    ).toBeCloseTo(degreesToRadians(Earth.orbit.meanAnomaly), 12);
});
