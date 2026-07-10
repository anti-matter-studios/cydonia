/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import PlanetMeshSchema from "./mesh.schema.json";

import type { PlanetGeometryOptions, PlanetMaterialOptions } from "@/lib/renderer";


/** Describes the data used when rendering a planet's {@link PlanetData}. */
export type PlanetMesh = PlanetGeometryOptions & PlanetMaterialOptions;

export { PlanetMeshSchema };
