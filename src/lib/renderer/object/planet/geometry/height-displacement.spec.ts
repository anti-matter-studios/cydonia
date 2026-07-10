/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { expect, it } from "vitest";
import { BufferGeometry, Float32BufferAttribute } from "three";

import { applyPlanetHeightDisplacement } from "./height-displacement";


const DIRECTIONS = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, -1]
] as const;

it("should apply height displacement in radius-relative direction space", function() {
    const options = {
        initialAmplitude: 0.25,
        lacunarity: 2,
        octaves: 4,
        persistence: 0.5,
        scale: 1.4
    };
    const smallRadius = 0.1;
    const largeRadius = 1;
    const small = applyPlanetHeightDisplacement(createGeometry(smallRadius), 1106, options, smallRadius);
    const large = applyPlanetHeightDisplacement(createGeometry(largeRadius), 1106, options, largeRadius);

    for (let vertex = 0; vertex < DIRECTIONS.length; vertex++) {
        const smallRadiusScale = getVertexLength(small, vertex) / smallRadius;
        const largeRadiusScale = getVertexLength(large, vertex) / largeRadius;

        expect(smallRadiusScale).toBeCloseTo(largeRadiusScale, 6);
        expect(smallRadiusScale).toBeGreaterThanOrEqual(0.75);
    }
});

function createGeometry(radius: number): BufferGeometry {
    const geometry = new BufferGeometry();
    const positions = DIRECTIONS.flatMap(function([x, y, z]) {
        return [x * radius, y * radius, z * radius];
    });

    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));

    return geometry;
}

function getVertexLength(geometry: BufferGeometry, vertex: number): number {
    const position = geometry.getAttribute("position");
    const x = position.getX(vertex);
    const y = position.getY(vertex);
    const z = position.getZ(vertex);

    return Math.hypot(x, y, z);
}
