/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { file } from "bun";

import { PLANET_MODULE_PATH } from "@/scripts/generate/toml/paths";


const TOML_IMPORT_PATTERN = /^import [A-Za-z0-9_]+Data from "\.\/.+\.toml";$/gmu;
const PLANET_EXPORT_PATTERN = /^export const [A-Za-z0-9_]+ = [A-Za-z0-9_]+Data as PlanetData;$/gmu;
const ALL_MINOR_PLANETS_PATTERN = /export const AllMinorPlanets = \[\n(?<items>[\s\S]*?)\n\] as const;/u;

export interface PlanetIndexEntry {
    /** TypeScript export identifier for the generated planet. */
    readonly identifier: string;

    /** TOML filename imported by the generated index entry. */
    readonly filename: string;
}

/** Applies the generated descriptor import/export and appends it to `AllMinorPlanets`. */
export async function addMinorPlanetToPlanetIndex(entry: PlanetIndexEntry): Promise<void> {
    const source = await file(PLANET_MODULE_PATH).text();
    const updated = addMinorPlanetToIndexSource(source, entry);

    await file(PLANET_MODULE_PATH).write(updated);
}

/** Adds a generated planet to a planet-index source string. */
export function addMinorPlanetToIndexSource(source: string, entry: PlanetIndexEntry): string {
    if (source.includes(`import ${entry.identifier}Data from "./${entry.filename}";`)) {
        throw new Error(`${entry.identifier} is already imported by the planet index.`);
    }
    if (source.includes(`export const ${entry.identifier} = ${entry.identifier}Data as PlanetData;`)) {
        throw new Error(`${entry.identifier} is already exported by the planet index.`);
    }

    const withImport = insertAfterLastMatch(
        source,
        TOML_IMPORT_PATTERN,
        `import ${entry.identifier}Data from "./${entry.filename}";`
    );
    const withExport = insertAfterLastMatch(
        withImport,
        PLANET_EXPORT_PATTERN,
        `export const ${entry.identifier} = ${entry.identifier}Data as PlanetData;`
    );

    return addIdentifierToAllMinorPlanets(withExport, entry.identifier);
}

function insertAfterLastMatch(source: string, pattern: RegExp, insertion: string): string {
    const matches = [...source.matchAll(pattern)];
    const lastMatch = matches.at(-1);

    if (typeof lastMatch?.index === "undefined") {
        throw new Error(`Could not find insertion point for "${insertion}".`);
    }

    const insertionIndex = lastMatch.index + lastMatch[0].length;

    return `${source.slice(0, insertionIndex)}\n${insertion}${source.slice(insertionIndex)}`;
}

function addIdentifierToAllMinorPlanets(source: string, identifier: string): string {
    const match = ALL_MINOR_PLANETS_PATTERN.exec(source);

    if (typeof match?.groups?.items === "undefined") {
        throw new Error("Could not find AllMinorPlanets in the planet index.");
    }

    const items = match.groups.items
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

    if (items.includes(identifier)) {
        throw new Error(`${identifier} is already listed in AllMinorPlanets.`);
    }

    const updatedList = [
        "export const AllMinorPlanets = [",
        `    ${[...items, identifier].join(", ")}`,
        "] as const;"
    ].join("\n");

    return `${source.slice(0, match.index)}${updatedList}${source.slice(match.index + match[0].length)}`;
}
