/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import {
    Euler,
    type IUniform,
    Object3D, Quaternion,
    ShaderMaterial,
    Vector3
} from "three";

import { type GameObject, wrapGameObject } from "@/lib/renderer/object";
import {
    convertDegreesOrbitalParameterAnglesToRadians,
    type PlanetData
} from "@/lib/schemas";
import {
    getBodyPerifocalCoordinatesAtTime,
    getOrbitPerifocalToWorldQuaternion
} from "@/lib/orbit";

import { createPlanetOrbit, type PlanetOrbit } from "./orbit";
import { createPlanetMesh } from "./mesh";
import { degreesToRadians } from "@/lib/math";
import { brand } from "@/lib/utils";


export type { PlanetOrbit } from "./orbit";

/** Base game object for all the planets (major and minor) rendered in the system. */
export interface Planet extends GameObject<Object3D> {
    /** Reference to the orbital parameters of this planet object. */
    readonly data: PlanetData;

    /**
     * The game object used to render the orbit of the planet.
     * Note that the orbit is NOT attached to its planet and will NOT be rendered by default.
     */
    readonly orbit: PlanetOrbit;
}

/**
 * Creates a new planet game object.
 *
 * @param data The data of the planet to create.
 * @returns The generated planet game object.
 */
export function createPlanet(data: PlanetData): Planet {
    const perifocalToWorld = getOrbitPerifocalToWorldQuaternion(
        convertDegreesOrbitalParameterAnglesToRadians(data.orbit.angles)
    );

    const mesh = createPlanetMesh(data.mesh);
    const orbit = createPlanetOrbit(data.orbit);
    const container = new Object3D();

    container.position.applyQuaternion(perifocalToWorld);
    container.add(mesh);
    container.add(orbit);

    if (data.rotation) {
        mesh.quaternion.setFromEuler(new Euler(0, degreesToRadians(data.rotation.tilt), 0));
    }

    return wrapGameObject(container, {
        get data() {
            return data;
        },
        get orbit() {
            return orbit;
        },
        update() {
            if (data.mesh.material === "gradient") {
                const material = mesh.material as ShaderMaterial;
                const uniform = material.uniforms.uLightDirection as IUniform<Vector3>;
                const rotationInverseQuaternion = mesh.quaternion.clone().invert();
                const lightNormal = mesh.position.clone().applyQuaternion(rotationInverseQuaternion).multiplyScalar(-1);
                uniform.value.copy(lightNormal);
            }
        },
        simulationUpdate(state, deltaTime) {
            mesh.position.copy(getBodyPerifocalCoordinatesAtTime(state.wallClockJD, data.orbit));

            if (data.rotation) {
                const amount = new Quaternion().setFromAxisAngle(
                    new Vector3(0, 0, 1),
                    degreesToRadians(brand(data.rotation.rate * (deltaTime / 86400)))
                );
                mesh.quaternion.multiply(amount);
            }
        }
    });
}