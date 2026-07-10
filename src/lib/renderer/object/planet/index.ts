/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { Euler, Mesh, Quaternion, Vector3 } from "three";
import { type GameObject, wrapGameObject } from "@/lib/renderer/object";
import { convertDegreesOrbitalParameterAnglesToRadians, type PlanetData } from "@/lib/schemas";

import { bindPlanetMaterialUniforms, createPlanetMaterial, type PlanetMaterial, type PlanetMaterialOptions } from "./material";
import { createPlanetGeometry, type PlanetGeometry, type PlanetGeometryOptions } from "./geometry";
import { degreesToRadians } from "@/lib/math";
import { brand } from "@/lib/utils";
import { getBodyPerifocalCoordinatesAtTime, getOrbitPerifocalToWorldQuaternion } from "@/lib/orbit";
import { PLANET_SCALE_OVERRIDE } from "@/lib/renderer/config";


export type { PlanetGeometry, PlanetMaterial, PlanetGeometryOptions, PlanetMaterialOptions };

/** Game object used to represent a planet in the system. */
export interface Planet extends GameObject<Mesh<PlanetGeometry, PlanetMaterial>> {
    /** If set, applies the orbit offset to the position of the mesh. */
    applyOrbit: boolean;

    /** If set, overrides the automatic light position computation. */
    lightSource: Vector3 | undefined;
}

/**
 * Creates a new planet game object.
 *
 * @param data The data of the planet to generate.
 * @returns The generated game object.
 */
export function createPlanet(data: PlanetData): Planet {
    let applyOrbit = true;
    let lightSource: Vector3 | undefined;

    const material = createPlanetMaterial();
    const mesh = new Mesh(createPlanetGeometry(data.mesh), material);
    mesh.onBeforeRender = function() {
        let lightDirection = lightSource?.clone();
        lightDirection ??= this.position.clone().multiplyScalar(-1);

        // Counter-act the mesh rotation.
        lightDirection.applyQuaternion(mesh.quaternion.clone().invert());

        bindPlanetMaterialUniforms(material, lightDirection, data.mesh);
    };
    mesh.scale.setScalar(PLANET_SCALE_OVERRIDE);

    const worldQuaternion = getOrbitPerifocalToWorldQuaternion(
        convertDegreesOrbitalParameterAnglesToRadians(data.orbit.angles)
    );
    if (data.rotation?.tilt) {
        mesh.quaternion.setFromEuler(
            new Euler(degreesToRadians(data.rotation.tilt), 0, 0)
        );
    }

    return wrapGameObject(mesh, {
        get applyOrbit() {
            return applyOrbit;
        },
        set applyOrbit(value) {
            applyOrbit = value;
        },
        get lightSource() {
            return lightSource;
        },
        set lightSource(value) {
            lightSource = value;
        },
        simulationUpdate(state, deltaTimeSeconds) {
            if (data.rotation?.rate) {
                mesh.quaternion.multiply(new Quaternion().setFromAxisAngle(
                    new Vector3(0, 0, 1),
                    degreesToRadians(brand(data.rotation.rate * deltaTimeSeconds / 86_400))
                ));
            }

            if (applyOrbit) {
                this.position
                    .copy(getBodyPerifocalCoordinatesAtTime(state.wallClockJD, data.orbit))
                    .applyQuaternion(worldQuaternion);
            }
        }
    });
}
