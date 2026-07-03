/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { PlanetOrbitData } from "./types";
import earth from "./earth.yaml";
import jupiter from "./jupiter.yaml";
import mars from "./mars.yaml";
import mercury from "./mercury.yaml";
import neptune from "./neptune.yaml";
import saturn from "./saturn.yaml";
import uranus from "./uranus.yaml";
import venus from "./venus.yaml";

export type { PlanetOrbitColour, PlanetOrbitData } from "./types";

/** Orbital and rendering data for all the major planets in the solar system. */
export const PLANETS = {
    mercury: mercury as PlanetOrbitData,
    venus: venus as PlanetOrbitData,
    earth: earth as PlanetOrbitData,
    mars: mars as PlanetOrbitData,
    jupiter: jupiter as PlanetOrbitData,
    saturn: saturn as PlanetOrbitData,
    uranus: uranus as PlanetOrbitData,
    neptune: neptune as PlanetOrbitData
} as const;
