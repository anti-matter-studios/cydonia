/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { type Object3D } from "three";
import type { SystemPeekerRendererState } from "../state";


/** Object rendered in the scene. */
export interface SystemPeekerObject<T extends Object3D> {
    /** The underlying Three.js object. */
    readonly object: T;

    /**
     * Updates the object.
     *
     * @param deltaTime The time since the last call to "update".
     * @param state The renderer state.
     */
    update?(deltaTime: number, state: SystemPeekerRendererState): void;
}
