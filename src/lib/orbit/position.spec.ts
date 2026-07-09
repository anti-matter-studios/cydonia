/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { Vector3 } from "three";
import { expect, it } from "vitest";

import { Earth } from "@/data";
import { asRadiansWrapped, type JulianDaysTDB } from "@/lib/math";
import { brand } from "@/lib/utils";
import {
    getBodyPerifocalCoordinatesAtTime,
    getBodyPerifocalCoordinatesFromEccentricAnomaly,
    getBodyWorldCoordinatesAtTime,
    getBodyWorldCoordinatesFromEccentricAnomaly
} from "./position";


const EARTH_QUARTER_ORBIT_TIME: JulianDaysTDB = brand(2461319.2888790146);

const EARTH_EPOCH_ECCENTRIC_ANOMALY = asRadiansWrapped(3.1380398677035863);
const EARTH_QUARTER_ORBIT_ECCENTRIC_ANOMALY = asRadiansWrapped(-1.5912365092668985);

const EARTH_EPOCH_PERIFOCAL_POSITION = new Vector3(
    -1.0166376570789424,
    0.003551621351743617,
    0
);
const EARTH_QUARTER_ORBIT_PERIFOCAL_POSITION = new Vector3(
    -0.03726301491074926,
    -0.999465497154456,
    0
);

const EARTH_EPOCH_HELIOCENTRIC_POSITION = new Vector3(
    0.24729145502346486,
    -0.9861093615297793,
    0.000056399432729913005
);
const EARTH_QUARTER_ORBIT_HELIOCENTRIC_POSITION = new Vector3(
    0.9777818971249087,
    0.21038624323111546,
    -0.00005095443821906818
);

function expectVectorClose(actual: Vector3, expected: Vector3): void {
    expect(actual.x).toBeCloseTo(expected.x, 12);
    expect(actual.y).toBeCloseTo(expected.y, 12);
    expect(actual.z).toBeCloseTo(expected.z, 12);
}

it("returns Earth's perifocal position at its Horizons epoch", () => {
    expectVectorClose(
        getBodyPerifocalCoordinatesFromEccentricAnomaly(EARTH_EPOCH_ECCENTRIC_ANOMALY, Earth.orbit),
        EARTH_EPOCH_PERIFOCAL_POSITION
    );
    expectVectorClose(
        getBodyPerifocalCoordinatesAtTime(Earth.orbit.epoch, Earth.orbit),
        EARTH_EPOCH_PERIFOCAL_POSITION
    );
});

it("returns Earth's perifocal position a quarter orbit after its Horizons epoch", () => {
    expectVectorClose(
        getBodyPerifocalCoordinatesFromEccentricAnomaly(EARTH_QUARTER_ORBIT_ECCENTRIC_ANOMALY, Earth.orbit),
        EARTH_QUARTER_ORBIT_PERIFOCAL_POSITION
    );
    expectVectorClose(
        getBodyPerifocalCoordinatesAtTime(EARTH_QUARTER_ORBIT_TIME, Earth.orbit),
        EARTH_QUARTER_ORBIT_PERIFOCAL_POSITION
    );
});

it("returns Earth's heliocentric position at its Horizons epoch", () => {
    expectVectorClose(
        getBodyWorldCoordinatesFromEccentricAnomaly(EARTH_EPOCH_ECCENTRIC_ANOMALY, Earth.orbit),
        EARTH_EPOCH_HELIOCENTRIC_POSITION
    );
    expectVectorClose(
        getBodyWorldCoordinatesAtTime(Earth.orbit.epoch, Earth.orbit),
        EARTH_EPOCH_HELIOCENTRIC_POSITION
    );
    expect(getBodyWorldCoordinatesAtTime(Earth.orbit.epoch, Earth.orbit).length())
        .toBeCloseTo(1.0166438608505868, 12);
});

it("returns Earth's heliocentric position a quarter orbit after its Horizons epoch", () => {
    expectVectorClose(
        getBodyWorldCoordinatesFromEccentricAnomaly(EARTH_QUARTER_ORBIT_ECCENTRIC_ANOMALY, Earth.orbit),
        EARTH_QUARTER_ORBIT_HELIOCENTRIC_POSITION
    );
    expectVectorClose(
        getBodyWorldCoordinatesAtTime(EARTH_QUARTER_ORBIT_TIME, Earth.orbit),
        EARTH_QUARTER_ORBIT_HELIOCENTRIC_POSITION
    );
    expect(getBodyWorldCoordinatesAtTime(EARTH_QUARTER_ORBIT_TIME, Earth.orbit).length())
        .toBeCloseTo(1.000159893358278, 12);
});
