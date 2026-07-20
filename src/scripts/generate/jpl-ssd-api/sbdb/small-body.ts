/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type AstronomicalUnits, type Kilometers } from "@/lib/math/distance";
import { brand } from "@/lib/utils";


/** Description of a small body returned from the SBDB API. */
export interface SmallBody {
    /** The designation of the body. */
    readonly designation: string;
    /** The full name of the body. */
    readonly fullName: string;
    /** The short name of the body. */
    readonly name: string;
    /** The class of the body. */
    readonly class: string;
    /** The semi-major axis of the body. */
    readonly semiMajorAxis: AstronomicalUnits;
    /** The eccentricity of the body. */
    readonly eccentricity: number;
    /** The diameter of the body. If the size is not known, this value is null. */
    readonly diameter: Kilometers|null;
}

/**
 * Parses the small body object returned from the SBDB API.
 *
 * @param fields The fields included in the response.
 * @param data The data of the body that should be parsed.
 * @returns The small body object that was retrieved.
 */
export function parseSmallBodyObject(fields: readonly string[], data: ReadonlyArray<string | null>): SmallBody {
    if (fields.length !== data.length) {
        throw new Error("The number of fields and data entries do not match.");
    }

    type WriteableSmallBody = { -readonly [key in keyof SmallBody]?: SmallBody[key] };
    const body: WriteableSmallBody = {};
    for (const [index, field] of fields.entries()) {
        switch (field) {
        case "pdes":
            if (data[index] === null) {
                throw new Error("The designation of a small body cannot be null.");
            }
            body.designation = data[index];
            break;
        case "full_name":
            if (data[index] === null) {
                throw new Error("The full name of a small body cannot be null.");
            }
            body.fullName = data[index];
            break;
        case "name":
            if (data[index] === null) {
                throw new Error("The name of a small body cannot be null.");
            }
            body.name = data[index];
            break;
        case "class":
            if (data[index] === null) {
                throw new Error("The class of a small body cannot be null.");
            }
            body.class = data[index];
            break;
        case "a":
            if (data[index] === null) {
                throw new Error("The semi-major axis of a small body cannot be null.");
            }
            body.semiMajorAxis = brand(parseFloat(data[index]));
            break;
        case "e":
            if (data[index] === null) {
                throw new Error("The eccentricity of a small body cannot be null.");
            }
            body.eccentricity = parseFloat(data[index]);
            break;
        case "diameter":
            if (data[index] === null) {
                body.diameter = null;
            } else {
                body.diameter = brand(parseFloat(data[index]));
            }
            break;
        }
    }

    return body as SmallBody;
}