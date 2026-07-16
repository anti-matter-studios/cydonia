/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import type { StoryObj, Meta } from "@storybook/react-vite";

import { MinorPlanetEditor } from ".";
import type { MinorPlanetEditorProps } from "./types";
import { RendererContextProvider } from "@/component/atom/renderer/context";
import { brand } from "@/lib/utils";


const MinorPlanetEditorMeta: Meta<MinorPlanetEditorProps> = {
    title: "Atom/Renderer/Minor Planet Editor",
    component: MinorPlanetEditor,
    parameters: { layout: "fullscreen" },
    decorators: Story => <RendererContextProvider children={<Story />} />
};
export default MinorPlanetEditorMeta;

MinorPlanetEditorMeta.args = {
    simulationSpeed: 100
};
MinorPlanetEditorMeta.argTypes = {
    name: {
        name: "Name",
        control: { type: "text" },
        table: { category: "Geometry" }
    },
    showOrbit: {
        name: "Show Orbit",
        control: { type: "boolean" }
    },
    simulationSpeed: {
        name: "Simulation Speed",
        description: "Simulation speed in days per second",
        control: { type: "number", min: 0, step: 1 }
    },

    radius: {
        name: "Radius",
        control: { type: "number", min: 0, step: 0.01 },
        table: { category: "Geometry" }
    },
    subdivisions: {
        name: "Subdivisions",
        control: { type: "number", min: 0, step: 1 },
        table: { category: "Geometry" }
    },

    heightmapInitialAmplitude: {
        name: "Initial Amplitude",
        description: "Amplitude of the first octave of the heightmap",
        control: { type: "number", min: 0, step: 0.01 },
        table: { category: "Heightmap" }
    },
    heightmapScale: {
        name: "Scale",
        control: { type: "number", min: 0, step: 0.01 },
        table: { category: "Heightmap" }
    },
    heightmapOctaves: {
        name: "Octaves",
        control: { type: "number", min: 0, step: 1 },
        table: { category: "Heightmap" }
    },
    heightMapPersistence: {
        name: "Persistence",
        control: { type: "number", min: 0, step: 0.01 },
        table: { category: "Heightmap" }
    },
    heightMapLacunarity: {
        name: "Lacunarity",
        control: { type: "number", min: 0, step: 0.1 },
        table: { category: "Heightmap" }
    },

    specularLight: {
        name: "Specular Light",
        control: { type: "color" },
        table: { category: "Material" }
    },
    specularThreshold: {
        name: "Specular Threshold",
        control: { type: "number", min: 0, step: 0.01 },
        table: { category: "Material" }
    },
    shadeSteps: {
        name: "Shade Steps",
        control: { type: "number", min: 1, step: 1 },
        table: { category: "Material" }
    },
    gradientLight: {
        name: "Light Colour",
        control: { type: "color" },
        table: { category: "Material" }
    },
    gradientDark: {
        name: "Dark Colour",
        control: { type: "color" },
        table: { category: "Material" }
    },
    wireframe: {
        name: "Wireframe",
        control: { type: "boolean" },
        table: { category: "Material" }
    },

    rotationRate: {
        name: "Rotation Rate",
        control: { type: "number", min: 0, step: 0.01 },
        table: { category: "Rotation" }
    },
    rotationTilt: {
        name: "Rotation Tilt",
        control: { type: "number", min: 0, step: 1 },
        table: { category: "Rotation" }
    },

    inclination: {
        name: "Inclination",
        control: { type: "number", min: 0, step: 0.1 },
        table: { category: "Orbit" }
    },
    longitudeOfAscendingNode: {
        name: "Longitude Of Ascending Node",
        control: { type: "number", min: 0, step: 0.1 },
        table: { category: "Orbit" }
    },
    argumentOfPeriapsis: {
        name: "Argument Of Periapsis",
        control: { type: "number", min: 0, step: 0.1 },
        table: { category: "Orbit" }
    },
    orbitalPeriod: {
        name: "Orbital Period",
        control: { type: "number", min: 1, step: 0.1 },
        table: { category: "Orbit" }
    },
    eccentricity: {
        name: "Eccentricity",
        control: { type: "number", min: 0, step: 0.01 },
        table: { category: "Orbit" }
    }
};

export const CydoniaStory: StoryObj<MinorPlanetEditorProps> = {
    args: {
        name: "Cydonia",
        showOrbit: true,
        radius: 0.3,
        subdivisions: 3,

        heightmapInitialAmplitude: 0.2,
        heightmapScale: 0.3,
        heightmapOctaves: 8,
        heightMapPersistence: 0.5,
        heightMapLacunarity: 16,

        specularLight: "FFDDDD",
        specularThreshold: 0.97,

        shadeSteps: 4,

        gradientLight: "ee6677",
        gradientDark: "442222",

        rotationRate: 1,
        rotationTilt: 45,

        inclination: 13.04695520518346,
        longitudeOfAscendingNode: 327.9991971677421,
        argumentOfPeriapsis: 231.6372070055021,
        orbitalPeriod: brand(1529.493526766819),
        eccentricity: 1.240443478695231e-1,

        wireframe: false
    }
};

export const EarthStory: StoryObj<MinorPlanetEditorProps> = {
    name: "Earth",
    args: {
        name: "Earth",
        showOrbit: true,
        radius: 0.15,
        subdivisions: 2,

        heightmapInitialAmplitude: 0,
        heightmapScale: 0,
        heightmapOctaves: 1,
        heightMapPersistence: 0,
        heightMapLacunarity: 1,

        specularLight: "FFDDDD",
        specularThreshold: 0,

        shadeSteps: 3,

        gradientLight: "ee6677",
        gradientDark: "442222",

        rotationRate: 1,
        rotationTilt: 12,

        inclination: 0.004390023352082882,
        longitudeOfAscendingNode: 150.4669474031134,
        argumentOfPeriapsis: 313.8112358650934,
        orbitalPeriod: brand(365.155516058647),
        eccentricity: 1.683111526740723e-2,

        wireframe: false
    }
};
