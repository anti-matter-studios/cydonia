/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { Mesh, ShaderMaterial, SphereGeometry, Vector3 } from "three";
import type { SystemPeekerObject } from "./object";

import fragmentShader from "./shaders/world-space-gradient.frag";
import vertexShader from "./shaders/world-space-gradient.vert";
import { AU_UNIT_SCALE } from "./scene";


/** Type of the object used for the sun. */
export type SystemPeekerSun = SystemPeekerObject<Mesh<SphereGeometry, ShaderMaterial>>;

/** Scaling applied to all the planets, based on the unit/AU scale.. */
export const SYSTEM_SCALE = AU_UNIT_SCALE / 10;

/** Builds the geometry and material for the sun at the centre of the system. */
export function createSystemPeekerSunMesh(): SystemPeekerSun {
    const geometry = new SphereGeometry(4 * SYSTEM_SCALE, 32, 32);
    const material = new ShaderMaterial({
        name: "Sun",
        uniforms: {
            uHighlightColor: { value: new Vector3(1, .9, .34) },
            uLightDirection: { value: new Vector3(-.45, .55, .7).normalize() },
            uShadowColor: { value: new Vector3(.86, .57, .11) }
        },
        vertexShader,
        fragmentShader
    });

    return { object: new Mesh(geometry, material) };
}
