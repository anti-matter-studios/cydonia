/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type BufferGeometry, Vector3 } from "three";
import {
    createSimplexNoiseSampler,
    type LayeredSimplexNoiseOptions,
    type RandomGeneratorSeed
} from "@/lib/math";

/**
 * Applies height displacement to a planet geometry using layered simplex noise.
 *
 * @param geometry The planet geometry to apply height displacement to.
 * @param seed The seed for the random number generator used by the layered simplex noise.
 * @param options The options for the layered simplex noise.
 * @param radius The radius of the planet.
 * @returns The planet geometry with height displacement applied.
 */
export function applyPlanetHeightDisplacement(
    geometry: BufferGeometry,
    seed: RandomGeneratorSeed,
    options: LayeredSimplexNoiseOptions,
    radius = 1
): BufferGeometry {
    const attribute = geometry.getAttribute("position");
    const direction = new Vector3(0, 0, 0);
    const sampleDirection = new Vector3(0, 0, 0);
    const noise = createSimplexNoiseSampler(seed);

    for (let vertex = 0; vertex < attribute.count; vertex++) {
        direction.fromBufferAttribute(attribute, vertex);

        sampleDirection.copy(direction).normalize();

        const displacement = noise.layered(sampleDirection.x, sampleDirection.y, sampleDirection.z, options);
        direction.copy(sampleDirection).multiplyScalar(radius * (1 + displacement));
        attribute.setXYZ(vertex, direction.x, direction.y, direction.z);
    }

    attribute.needsUpdate = true;
    geometry.computeVertexNormals();

    return geometry;
}
