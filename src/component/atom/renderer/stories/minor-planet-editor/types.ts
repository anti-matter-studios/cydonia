/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { DurationDays } from "@/lib/math";


export interface MinorPlanetEditorProps {
    name: string;
    showOrbit: boolean;
    simulationSpeed: number;

    radius: number;
    subdivisions: number;

    heightmapInitialAmplitude: number;
    heightmapScale: number;
    heightmapOctaves: number;
    heightMapPersistence: number;
    heightMapLacunarity: number;

    specularLight: string;
    specularThreshold: number;

    shadeSteps: number;
    gradientLight: string;
    gradientDark: string;

    rotationRate: number;
    rotationTilt: number;

    inclination: number;
    longitudeOfAscendingNode: number;
    argumentOfPeriapsis: number;
    orbitalPeriod: DurationDays;
    eccentricity: number;

    wireframe: boolean;
}
