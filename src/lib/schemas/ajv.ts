/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import Ajv, { type ValidateFunction } from "ajv/dist/2020";
import AjvFormats from "ajv-formats";
import {
    type OrbitalParameters,
    OrbitalParametersSchema, type PlanetData,
    PlanetDataSchema, type PlanetMesh,
    PlanetMeshSchema
} from "@/lib/schemas/data";

// Create the instance and register all the schemas.
export const AjvInstance = new Ajv({ allErrors: true });
AjvFormats(AjvInstance);

AjvInstance.addSchema(PlanetMeshSchema);
AjvInstance.addSchema(OrbitalParametersSchema);
AjvInstance.addSchema(PlanetDataSchema);

/** {@link ValidateFunction} used to check if the input is an {@link OrbitalParameters}. */
export const isOrbitalParameters: ValidateFunction<OrbitalParameters> = AjvInstance.compile(OrbitalParametersSchema);

/** {@link ValidateFunction} used to check if the input is an {@link PlanetMesh}. */
export const isPlanetMesh: ValidateFunction<PlanetMesh> = AjvInstance.compile(PlanetMeshSchema);

/** {@link ValidateFunction} used to check if the input is an {@link PlanetData}. */
export const isPlanetData: ValidateFunction<PlanetData> = AjvInstance.compile(PlanetDataSchema);
