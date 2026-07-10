/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { Vector3 } from "three";
import type { RandomGenerator } from "./random-generator";
import { clamp } from "./scalar";


/** Samples a uniformly-distributed unit vector on a sphere. */
export function randomUnitVector(random: RandomGenerator): Vector3 {
    const z = random.next() * 2 - 1;
    const theta = random.next() * Math.PI * 2;
    const radius = Math.sqrt(Math.max(0, 1 - z * z));

    return new Vector3(
        radius * Math.cos(theta),
        z,
        radius * Math.sin(theta)
    );
}

/** Computes the great-circle angular distance between two unit vectors. */
export function sphericalDistance(a: Vector3, b: Vector3): number {
    return Math.acos(clamp(a.dot(b), -1, 1));
}
