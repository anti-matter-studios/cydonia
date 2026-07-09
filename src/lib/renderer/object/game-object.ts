/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { Object3D } from "three";
import type { SimulationState } from "../simulation/state";

/** List of methods attached to a Three.JS object. */
interface GameObjectMethods {
    /**
     * Runs an update of the object before a render pass.
     *
     * This is called every frame, regardless of whether the simulation state has changed.
     * For simulation-based updates, you should rather use {@link simulationUpdate}.
     *
     * @param deltaTime The time elapsed since the last rendered frame, in seconds.
     */
    update?(deltaTime: number): void;

    /**
     * Runs an update of the object's state based on the given simulation state.
     *
     * This is called only when the simulation state is updated.
     * For a more consistent, render-time-based update, see {@link update}.
     *
     * @param state The state of the simulation at the current instant.
     * @param deltaTime The time elapsed since the last simulation update, in seconds.
     */
    simulationUpdate?(state: SimulationState, deltaTime: number): void;
}

/** System peeker "game" object that can interact with the world. */
export type GameObject<Base extends Object3D> = Base & GameObjectMethods;

/**
 * Methods and accessors to install on a base Three.js object.
 *
 * Method bodies receive the final {@link GameObject} as `this`, so both Three.js fields
 * and sibling methods are available without manual casts.
 */
export type GameObjectBehaviour<Base extends Object3D, Type extends GameObject<Base>> =
    Omit<Type, keyof Base> & ThisType<Type>;


/**
 * Wraps a Three.JS object into a {@link GameObject}.
 *
 * @param object The Three.JS object to wrap.
 * @returns A {@link GameObject} wrapper for the provided object.
 */
export function wrapGameObject<Base extends Object3D>(
    object: Base
): GameObject<Base>;

/**
 * Adds the given methods and accessors to a base Three.js object.
 *
 * @param object The Three.JS object to wrap.
 * @param behaviour The methods and accessors to add to the object.
 * @returns A {@link GameObject} wrapper for the provided object.
 */
export function wrapGameObject<Base extends Object3D, Type extends GameObject<Base>>(
    object: Base,
    behaviour: GameObjectBehaviour<Base, Type>
): Type;

/**
 * Adds the given methods and accessors to a base Three.js object.
 *
 * @param object The Three.JS object to wrap.
 * @param behaviour The methods and accessors to add to the object.
 * @returns A {@link GameObject} wrapper for the provided object.
 */
export function wrapGameObject(
    object: Object3D,
    behaviour?: GameObjectBehaviour<Object3D, GameObject<Object3D>>
): GameObject<Object3D> {
    behaviour ??= {};

    // Force-implement the "update" and "simulationUpdate" methods recursively.
    const originalUpdate = behaviour.update;
    Object.defineProperty(behaviour, "update", {
        value(this: GameObject<Object3D>, deltaTime: number): void {
            originalUpdate?.call(this, deltaTime);
            recursiveUpdate.call(this, deltaTime);
        }
    });
    const originalSimulationUpdate = behaviour.simulationUpdate;
    Object.defineProperty(behaviour, "simulationUpdate", {
        value(this: GameObject<Object3D>, state: SimulationState, deltaTime: number): void {
            originalSimulationUpdate?.call(this, state, deltaTime);
            recursiveSimulationUpdate.call(this, state, deltaTime);
        }
    });

    return Object.defineProperties(object, Object.getOwnPropertyDescriptors(behaviour));
}

/** Implementation of {@link GameObjectMethods.update} that recurses into children. */
function recursiveUpdate(this: GameObject<Object3D>, deltaTime: number): void {
    this.children.forEach(child => {
        if ("update" in child && typeof child.update === "function") {
            (child.update as NonNullable<GameObjectMethods["update"]>)(deltaTime);
        }
    });
}

/** Implementation of {@link GameObjectMethods.simulationUpdate} that recurses into children. */
function recursiveSimulationUpdate(this: GameObject<Object3D>, simulationState: SimulationState, deltaTime: number): void {
    this.children.forEach(child => {
        if ("simulationUpdate" in child && typeof child.simulationUpdate === "function") {
            (child.simulationUpdate as NonNullable<GameObjectMethods["simulationUpdate"]>)(simulationState, deltaTime);
        }
    });
}