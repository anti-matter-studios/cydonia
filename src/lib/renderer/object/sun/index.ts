/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type Material, Mesh, ShaderMaterial, SphereGeometry } from "three";

import { type GameObject, wrapGameObject } from "../game-object";

import vertexShader from "./sun-shader.vert";
import fragmentShader from "./sun-shader.frag";

/** {@link GameObject} that can render the sun in the centre of the scene. */
export type Sun = GameObject<Mesh<SphereGeometry, Material>>;

/** Creates the {@link Sun} object. */
export function createSun(): Sun {
    const geometry = new SphereGeometry(.1, 32, 32);
    const material = new ShaderMaterial({
        name: "Sun Material",
        vertexShader,
        fragmentShader,
        transparent: false,
        fog: false,
    });

    const mesh = new Mesh(geometry, material);
    return wrapGameObject(mesh);
}
