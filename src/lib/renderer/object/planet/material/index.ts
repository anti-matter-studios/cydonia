/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { Color, type IUniform, ShaderMaterial, Vector3 } from "three";

import fragmentShader from "./planet-material.frag";
import vertexShader from "./planet-material.vert";


/** Options used to customise the planet's material. */
export interface PlanetMaterialOptions {
    /** Hexadecimal colour of the specular light reflection, if any. */
    "specular-light"?: string;

    /** Threshold for the specular reflection. */
    "specular-threshold"?: number;

    /** Number of shading steps applied to the gradient. */
    "shade-steps"?: number;

    /** Light colour value of the gradient for the planet. */
    "gradient-light": string;

    /** Dark colour value of the gradient for the planet. */
    "gradient-dark": string;
}

/** Material used when rendering a planet object. */
export type PlanetMaterial = ShaderMaterial & { uniforms: PlanetMaterialUniforms };

/** Uniforms exposed by the {@link PlanetMaterial} */
export interface PlanetMaterialUniforms extends Record<string, IUniform> {
    /** Value of the specular reflection on the planet. */
    uSpecularLightValue: IUniform<Color>;

    /** Light direction dot product threshold above which the specular reflection is applied. */
    uSpecularThreshold: IUniform<number>;

    /** Number of steps used to give the planet its cell-shaded look. */
    uShadeSteps: IUniform<number>;

    /** Light colour value of the gradient for the planet. */
    uGradientLightValue: IUniform<Color>;

    /** Dark colour value of the gradient for the planet. */
    uGradientDarkValue: IUniform<Color>;

    /** Direction of the light from the planet. */
    uLightDirection: IUniform<Vector3>;
}

/** Creates the material applied to a planet of the system. */
export function createPlanetMaterial(): PlanetMaterial {
    return new ShaderMaterial({
        name: "Planet Shaded Material",
        uniforms: {
            uSpecularLightValue: { value: new Color(1, 1, 1) },
            uSpecularThreshold: { value: 1 },
            uShadeSteps: { value: 5 },
            uGradientLightValue: { value: new Color(1, 1, 1) },
            uGradientDarkValue: { value: new Color(0, 0, 0) },
            uLightDirection: { value: new Vector3(0, 0, 1) }
        },
        fragmentShader,
        vertexShader
    }) as PlanetMaterial;
}

/**
 * Binds the uniform values for the planet material.
 *
 * This method should be invoked on the {@link Planet.onBeforeRender} event.
 *
 * @param material The material whose uniform values should be bound.
 * @param lightDirection The direction of the light source.
 * @param options The options for the planet material.
 */
export function bindPlanetMaterialUniforms(
    material: PlanetMaterial,
    lightDirection: Vector3,
    options: PlanetMaterialOptions
) {
    if (typeof options["specular-light"] !== "undefined") {
        material.uniforms.uSpecularLightValue.value.setHex(parseInt(options["specular-light"], 16));
        material.uniforms.uSpecularThreshold.value = options["specular-threshold"] ?? 0.95;
    } else {
        material.uniforms.uSpecularThreshold.value = 1;
    }
    if (typeof options["shade-steps"] !== "undefined") {
        material.uniforms.uShadeSteps.value = options["shade-steps"];
    }
    material.uniforms.uGradientLightValue.value.setHex(parseInt(options["gradient-light"], 16));
    material.uniforms.uGradientDarkValue.value.setHex(parseInt(options["gradient-dark"], 16));
    material.uniforms.uLightDirection.value.copy(lightDirection);
}
