/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { Object3D } from "three";
import type { SystemPeekerObject } from "./object";


/** Scale applied to the root scene. Used to represent that 1 AU is N three.js world units. */
export const AU_UNIT_SCALE = 300;

/** Return type of the {@link createSystemPeekerScene} function. */
export type SystemPeekerScene = SystemPeekerObject<Object3D>;

/** Creates the object that will serve as the root of the scene. */
export function createSystemPeekerScene(): SystemPeekerScene {
    const scene = new Object3D();
    scene.position.set(0, 0, 0);
    scene.scale.set(1 / AU_UNIT_SCALE, 1 / AU_UNIT_SCALE, 1 / AU_UNIT_SCALE);

    return { object: scene };
}