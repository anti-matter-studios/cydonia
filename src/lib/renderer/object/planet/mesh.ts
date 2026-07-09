/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import type * as Schemas from "@/lib/schemas";
import {
    BufferGeometry,
    Color,
    IcosahedronGeometry, type Material,
    Mesh,
    MeshBasicMaterial,
    OctahedronGeometry,
    ShaderMaterial,
    SphereGeometry,
    Vector3
} from "three";

import linearGradientFragmentShader from "./shaders/linear-gradient.frag";
import linearGradientVertexShader from "./shaders/linear-gradient.vert";
import { createMinorPlanetGeometry } from "./minor-planet-geometry";


/**
 * Creates the mesh required for a given planet object.
 *
 * @param data The data used as a basis for the planet mesh.
 * @returns The generated mesh for the planet.
 */
export function createPlanetMesh(data: Schemas.PlanetMesh): Mesh<BufferGeometry, Material> {
    return new Mesh(createPlanetMeshGeometry(data), createPlanetMeshMaterial(data));
}

/**
 * Creates the geometry required for a given planet object.
 *
 * @param data The data used as a basis for the planet geometry.
 * @returns The generated geometry for the planet.
 */
function createPlanetMeshGeometry(data: Schemas.AnyGeometry)  {
    let geometry: BufferGeometry;
    switch (data.geometry) {
    case "sphere":
        return new SphereGeometry(data.radius, data.segments);
    case "octahedron":
        geometry = new OctahedronGeometry(data.radius, data.details);
        geometry.computeVertexNormals();
        return geometry;
    case "icosahedron":
        geometry = new IcosahedronGeometry(data.radius, data.details);
        geometry.computeVertexNormals();
        return geometry;
    case "minor-planet":
        return createMinorPlanetGeometry({
            details: data.details,
            heightScale: data["height-scale"],
            noiseOctaves: data["noise-octaves"],
            noiseScale: data["noise-scale"],
            radius: data.radius,
            seed: data.seed
        });
    case "custom":
        return createCustomPlanetMeshGeometry(data);
    }

}


/**
 * Initialises the custom geometry for a given planet object.
 *
 * @param data The data to initialise the custom geometry with.
 * @returns The generated geometry for the planet.
 */
function createCustomPlanetMeshGeometry(data: Schemas.CustomGeometry): BufferGeometry {
    const geometry = new BufferGeometry();
    geometry.setFromPoints(data.points.map(([x, y, z]) => new Vector3(x, y, z)));

    if (data.indices) {
        geometry.setIndex(data.indices);
    }

    const facetedGeometry = geometry.index ? geometry.toNonIndexed() : geometry;
    facetedGeometry.computeVertexNormals();

    return facetedGeometry;
}

/**
 * Creates a material for a planet mesh.
 *
 * @param data The data to initialise the material with.
 * @returns The generated material for the planet.
 */
function createPlanetMeshMaterial(data: Schemas.AnyMaterial) {
    switch (data.material) {
    case "basic":
        return new MeshBasicMaterial({
            color: toColourRepresentation(data.colour),
            wireframe: data.wireframe
        });
    case "gradient":
        return new ShaderMaterial({
            uniforms: {
                uHighlightColor: { value: toColourRepresentation(data["from-colour"]) },
                uLightDirection: { value: new Vector3(0, 0, 1) },
                uShadowColor: { value: toColourRepresentation(data["to-colour"]) }
            },
            vertexShader: linearGradientVertexShader,
            fragmentShader: linearGradientFragmentShader
        });
    }
}

/** Maps a {@link ColourSource} to a {@link Color} or its string representation. */
function toColourRepresentation(colour: Schemas.ColourSource): Color | string {
    if (typeof colour === "string") {
        return colour;
    }

    return new Color(colour[0], colour[1], colour[2]);
}
