/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { useMemo } from "react";
import type { PlanetData } from "@/lib/schemas";
import type { DurationDays } from "@/lib/math";
import type { AstronomicalUnits } from "@/lib/math/distance";
import { brand } from "@/lib/utils";
import type { MinorPlanetEditorProps } from "./types";


const SECONDS_IN_A_DAY = 86400;
const ASTRONOMICAL_UNIT_METERS = 149_597_870_700;
const SOLAR_STANDARD_GRAVITATIONAL_PARAMETER = 1.32712440018e20;


/** Derives a heliocentric semi-major axis in AU from an orbital period, in days. */
function deriveSolarSemiMajorAxisAstronomicalUnits(orbitalPeriodDays: DurationDays): AstronomicalUnits {
    const orbitalPeriodSeconds = orbitalPeriodDays * SECONDS_IN_A_DAY;
    const semiMajorAxisMeters = Math.cbrt(
        SOLAR_STANDARD_GRAVITATIONAL_PARAMETER * (orbitalPeriodSeconds / (2 * Math.PI)) ** 2
    );

    return brand(semiMajorAxisMeters / ASTRONOMICAL_UNIT_METERS);
}

/** Creates the planet data driven by the minor planet renderer story controls. */
export function usePlanetData(props: MinorPlanetEditorProps): PlanetData {
    return useMemo(function createPlanetData(): PlanetData {
        return {
            name: props.name,
            designation: "INVALID_ID",
            rotation: {
                rate: brand(props.rotationRate),
                tilt: brand(props.rotationTilt)
            },
            mesh: {
                radius: props.radius,
                subdivisions: props.subdivisions,
                seed: props.name,

                height: {
                    initialAmplitude: props.heightmapInitialAmplitude,
                    octaves: props.heightmapOctaves,
                    persistence: props.heightMapPersistence,
                    scale: props.heightmapScale,
                    lacunarity: props.heightMapLacunarity
                },

                "specular-light": props.specularLight,
                "specular-threshold": props.specularThreshold,

                "shade-steps": props.shadeSteps,
                "gradient-light": props.gradientLight,
                "gradient-dark": props.gradientDark,
            },
            orbit: {
                angles: {
                    inclination: brand(props.inclination),
                    argumentOfPeriapsis: brand(props.argumentOfPeriapsis),
                    longitudeOfAscendingNode: brand(props.longitudeOfAscendingNode)
                },
                orbitalPeriod: props.orbitalPeriod,
                epoch: brand(0),
                meanAnomaly: brand(0),
                eccentricity: brand(props.eccentricity),
                semiMajorAxis: deriveSolarSemiMajorAxisAstronomicalUnits(props.orbitalPeriod),
                units: {
                    time: "julian-date-barycentric-dynamical-time-days",
                    distance: "astronomical-units",
                    angle: "degrees"
                }
            },
            source: {
                name: "Custom",
                time: new Date().toISOString(),
                data: {}
            }
        };
    }, [props]);
}
