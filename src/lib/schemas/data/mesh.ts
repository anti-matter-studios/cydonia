/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import PlanetMeshSchema from "./mesh.schema.json";

/** Spherical geometry used for a {@link PlanetMesh}. */
export interface SphereGeometry {
    /** The type of geometry to use to render the planet. */
    geometry: "sphere";

    /** The radius of the sphere. */
    radius: number;

    /** The number of segments used to render the sphere. */
    segments: number;
}

/** Icosahedron geometry used for a {@link PlanetMesh}. */
export interface IcosahedronGeometry {
    /** The type of geometry to use to render the planet. */
    geometry: "icosahedron";

    /** The radius of the icosahedron. */
    radius?: number;

    /** Number of subdivisions used when generating the mesh. */
    details?: number;
}

/** Octahedron geometry used for a {@link PlanetMesh}. */
export interface OctahedronGeometry {
    /** The type of geometry to use to render the planet. */
    geometry: "octahedron";

    /** The radius of the octahedron. */
    radius?: number;

    /** Number of subdivisions used when generating the mesh. */
    details?: number;
}

/** Procedural low-poly geometry used for minor planets. */
export interface MinorPlanetGeometry {
    /** The type of geometry to use to render the planet. */
    geometry: "minor-planet";

    /** The base radius of the minor planet. */
    radius?: number;

    /** Number of subdivisions used when generating the source icosahedron. */
    details?: number;

    /** Height displacement as a fraction of the radius. */
    "height-scale"?: number;

    /** Frequency of the first Simplex noise octave. */
    "noise-scale"?: number;

    /** Number of Simplex noise octaves blended into the heightmap. */
    "noise-octaves"?: number;

    /** Deterministic seed used when generating the heightmap. */
    seed?: number;
}

/** Custom geometry used for a {@link PlanetMesh}. */
export interface CustomGeometry {
    /** The type of geometry to use to render the planet. */
    geometry: "custom";

    /** List of 3d points rendered within the geometry. */
    points: Array<[number, number, number]>;

    /**
     * A list of vertex indices used when rendering triangles.
     * By default, the geometry is assumed to be sequential.
     * (aka. triangle 1 is vertices 1, 2, 3; triangle 2 is vertices 4, 5, 6; etc.)
     */
    indices?: number[];
}

/** Supported colour sources. */
export type ColourSource = string | [number, number, number];

/** Basic colour material used for a {@link PlanetMesh} */
export interface BasicMaterial {
    /** The type of material used to render the planet. */
    material: "basic";

    /** The colour of the material. */
    colour: ColourSource;

    /** Whether to render the object as a wireframe. */
    wireframe?: boolean;
}

/** Simple gradient colour material used for a {@link PlanetMesh} */
export interface GradientMaterial {
    /** The type of material used to render the planet. */
    material: "gradient";

    /** The start colour of the material. */
    "from-colour": ColourSource;

    /** The end colour of the material. */
    "to-colour": ColourSource;

    /** Whether to render the object as a wireframe. */
    wireframe?: boolean;
}

/** Union of all the possible planet geometries. */
export type AnyGeometry =
    | SphereGeometry
    | IcosahedronGeometry
    | OctahedronGeometry
    | MinorPlanetGeometry
    | CustomGeometry;

/** Union of all the possible planet materials. */
export type AnyMaterial = BasicMaterial | GradientMaterial;

/** Describes the data used when rendering a planet's {@link PlanetData}. */
export type PlanetMesh = AnyGeometry & AnyMaterial;

export { PlanetMeshSchema };
