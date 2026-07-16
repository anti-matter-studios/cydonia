/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { BunFile } from "bun";

import type { PlanetData, PlanetMesh } from "@/lib/schemas";

import { formatTomlAssignment, formatTomlString } from "./format";
import { formatOrbitalParametersToml } from "./orbit";


/** Writes a complete generated planet descriptor to a TOML file. */
export async function writePlanetDescriptorTomlFile(target: BunFile, descriptor: PlanetData): Promise<void> {
    await target.write(formatPlanetDescriptorToml(descriptor));
}

/** Serializes generated descriptor data using the style of existing planet TOML files. */
export function formatPlanetDescriptorToml(descriptor: PlanetData): string {
    const lines = [
        formatTomlAssignment("designation", descriptor.designation),
        formatTomlAssignment("name", descriptor.name),
        "",
        ...formatMeshToml(descriptor.mesh),
        "",
        "[mesh.height]",
        `initialAmplitude=${descriptor.mesh.height.initialAmplitude ?? 1}`,
        `scale=${descriptor.mesh.height.scale ?? 1}`,
        `octaves=${descriptor.mesh.height.octaves ?? 1}`,
        `persistence=${descriptor.mesh.height.persistence ?? 0.5}`,
        `lacunarity=${descriptor.mesh.height.lacunarity ?? 2}`,
        "",
        "[rotation]",
        `tilt=${descriptor.rotation?.tilt ?? 0}`,
        `rate=${descriptor.rotation?.rate ?? 0}`,
        "",
        formatOrbitalParametersToml(descriptor.orbit, descriptor.source).trimEnd()
    ];

    return `${lines.join("\n")}\n`;
}

function formatMeshToml(mesh: PlanetMesh): string[] {
    const lines = [
        "[mesh]",
        `radius=${mesh.radius ?? 0.1}`,
        `subdivisions=${mesh.subdivisions ?? 4}`,
        `seed=${formatSeed(mesh.seed)}`,
        `shade-steps=${mesh["shade-steps"] ?? 5}`
    ];

    if (typeof mesh["specular-light"] !== "undefined") {
        lines.push(
            `specular-light=${formatTomlString(mesh["specular-light"])}`,
            `specular-threshold=${mesh["specular-threshold"] ?? 0.92}`
        );
    }

    lines.push(
        `gradient-light=${formatTomlString(mesh["gradient-light"])}`,
        `gradient-dark=${formatTomlString(mesh["gradient-dark"])}`
    );

    return lines;
}

function formatSeed(seed: PlanetMesh["seed"]): string {
    return typeof seed === "string" ? formatTomlString(seed) : seed.toString();
}
