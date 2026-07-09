/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { useTranslation } from "react-i18next";
import Ajv from "ajv/dist/2020";
import AjvFormats from "ajv-formats";
import { OrbitalParametersSchema, PlanetDataSchema, PlanetMeshSchema } from "@/lib/schemas";
import { Earth } from "@/data";

const validator = new Ajv();
AjvFormats(validator);
validator.addSchema(OrbitalParametersSchema);
validator.addSchema(PlanetMeshSchema);
const isPlanetData = validator.compile(PlanetDataSchema);
console.log(isPlanetData(Earth));
console.log(isPlanetData.errors);

/** Main organism in charge of rendering the whole application. */
export default function Cydonia() {
    const { t } = useTranslation("home");

    return <h1>{t("hero.title")}</h1>;
}
