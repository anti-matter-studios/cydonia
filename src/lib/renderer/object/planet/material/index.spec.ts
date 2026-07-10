/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { expect, it } from "vitest";
import { Vector3 } from "three";

import { bindPlanetMaterialUniforms, createPlanetMaterial, type PlanetMaterialOptions } from ".";


it("should keep planet material uniforms isolated per material", function() {
    const firstMaterial = createPlanetMaterial();
    const secondMaterial = createPlanetMaterial();
    const firstOptions: PlanetMaterialOptions = {
        "specular-light": "ffffff",
        "specular-threshold": 0.8,
        "shade-steps": 4,
        "gradient-light": "ef9a48",
        "gradient-dark": "5f2f1d"
    };
    const secondOptions: PlanetMaterialOptions = {
        "shade-steps": 8,
        "gradient-light": "4f80f2",
        "gradient-dark": "13295a"
    };

    bindPlanetMaterialUniforms(firstMaterial, new Vector3(1, 0, 0), firstOptions);
    bindPlanetMaterialUniforms(secondMaterial, new Vector3(0, 1, 0), secondOptions);

    expect(firstMaterial).not.toBe(secondMaterial);
    expect(firstMaterial.uniforms.uGradientLightValue.value.getHexString()).toBe("ef9a48");
    expect(firstMaterial.uniforms.uGradientDarkValue.value.getHexString()).toBe("5f2f1d");
    expect(firstMaterial.uniforms.uSpecularLightValue.value.getHexString()).toBe("ffffff");
    expect(firstMaterial.uniforms.uSpecularThreshold.value).toBe(0.8);
    expect(firstMaterial.uniforms.uShadeSteps.value).toBe(4);
    expect(firstMaterial.uniforms.uLightDirection.value.toArray()).toEqual([1, 0, 0]);
    expect(secondMaterial.uniforms.uSpecularThreshold.value).toBe(1);
});
