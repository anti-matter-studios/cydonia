/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import {
    BufferGeometry,
    Float32BufferAttribute,
    Vector3
} from "three";


/** Creates a flat-shaded icosahedron geometry projected onto a sphere. */
export function createIcosahedronGeometry(radius = 1, subdivisions = 0): BufferGeometry {
    const subdivisionCount = Math.max(0, Math.floor(subdivisions));
    const vertices = ICOSAHEDRON_VERTICES.map((vertex) => vertex.clone().multiplyScalar(radius));
    let faces = [...ICOSAHEDRON_FACES];

    for (let i = 0; i < subdivisionCount; i++) {
        faces = subdivideFaces(faces, vertices, radius);
    }

    const { normals, positions } = createFlatAttributes(vertices, faces);
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geometry.setAttribute("normal", new Float32BufferAttribute(normals, 3));

    return geometry;
}

function createFlatAttributes(
    vertices: Vector3[],
    faces: Face[]
): { normals: number[]; positions: number[] } {
    const positions: number[] = [];
    const normals: number[] = [];
    const edgeA = new Vector3();
    const edgeB = new Vector3();
    const normal = new Vector3();

    for (const [a, b, c] of faces) {
        const vertexA = vertices[a];
        const vertexB = vertices[b];
        const vertexC = vertices[c];

        edgeA.subVectors(vertexB, vertexA);
        edgeB.subVectors(vertexC, vertexA);
        normal.crossVectors(edgeA, edgeB).normalize();

        positions.push(
            vertexA.x, vertexA.y, vertexA.z,
            vertexB.x, vertexB.y, vertexB.z,
            vertexC.x, vertexC.y, vertexC.z
        );
        normals.push(
            normal.x, normal.y, normal.z,
            normal.x, normal.y, normal.z,
            normal.x, normal.y, normal.z
        );
    }

    return { normals, positions };
}

function subdivideFaces(faces: Face[], vertices: Vector3[], radius: number): Face[] {
    const midpointCache = new Map<string, number>();
    const subdividedFaces: Face[] = [];

    for (const [a, b, c] of faces) {
        const ab = getMidpointIndex(a, b, vertices, midpointCache, radius);
        const bc = getMidpointIndex(b, c, vertices, midpointCache, radius);
        const ca = getMidpointIndex(c, a, vertices, midpointCache, radius);

        subdividedFaces.push(
            [a, ab, ca],
            [b, bc, ab],
            [c, ca, bc],
            [ab, bc, ca]
        );
    }

    return subdividedFaces;
}

function getMidpointIndex(
    a: number,
    b: number,
    vertices: Vector3[],
    midpointCache: Map<string, number>,
    radius: number
): number {
    const key = a < b ? `${a}:${b}` : `${b}:${a}`;
    const cachedIndex = midpointCache.get(key);

    if (cachedIndex !== undefined) {
        return cachedIndex;
    }

    const vertex = vertices[a].clone()
        .add(vertices[b])
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(radius);
    const index = vertices.push(vertex) - 1;

    midpointCache.set(key, index);

    return index;
}

type Face = [number, number, number];

/** Initial vertices of the base icosahedron. */
const ICOSAHEDRON_VERTICES = [
    new Vector3(-0.5257311121191336, 0.85065080835204, 0),
    new Vector3(0.5257311121191336, 0.85065080835204, 0),
    new Vector3(-0.5257311121191336, -0.85065080835204, 0),
    new Vector3(0.5257311121191336, -0.85065080835204, 0),
    new Vector3(0, -0.5257311121191336, 0.85065080835204),
    new Vector3(0, 0.5257311121191336, 0.85065080835204),
    new Vector3(0, -0.5257311121191336, -0.85065080835204),
    new Vector3(0, 0.5257311121191336, -0.85065080835204),
    new Vector3(0.85065080835204, 0, -0.5257311121191336),
    new Vector3(0.85065080835204, 0, 0.5257311121191336),
    new Vector3(-0.85065080835204, 0, -0.5257311121191336),
    new Vector3(-0.85065080835204, 0, 0.5257311121191336)
];

/** Initial faces of the base icosahedron. */
const ICOSAHEDRON_FACES: Face[] = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1]
];
