/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { Temporal } from "@js-temporal/polyfill";


/** Formats a JavaScript string as a TOML basic string. */
export function formatTomlString(value: string): string {
    return JSON.stringify(value);
}

/** Formats a key-value pair as a TOML assignment line. */
export function formatTomlAssignment(key: string, value: number, useExponential: true): string;

/** Formats a key-value pair as a TOML assignment line. */
export function formatTomlAssignment(key: string, value: unknown, useExponential?: boolean): string;

export function formatTomlAssignment(key: string, value: unknown, useExponential = false): string {
    return `${key} = ${formatTomlValue(value, useExponential)}`;
}

/** Formats the small TOML value set used by generated descriptor metadata. */
export function formatTomlValue(value: number, useExponential: true): string;

/** Formats the small TOML value set used by generated descriptor metadata. */
export function formatTomlValue(value: unknown, useExponential?: boolean): string;

/** Formats the small TOML value set used by generated descriptor metadata. */
export function formatTomlValue(value: unknown, useExponential?: boolean): string {
    switch (true) {
    case value instanceof Temporal.PlainDate:
    case value instanceof Temporal.PlainTime:
    case value instanceof Temporal.PlainDateTime:
        return formatTomlString(value.toString());
    case value instanceof Date:
        return formatTomlString(value.toISOString());
    case typeof value === "string":
        return formatTomlString(value);
    case typeof value === "number":
        return useExponential ? value.toExponential() : value.toString();
    case typeof value === "boolean":
        return value.toString();
    default:
        return formatTomlString(JSON.stringify(value));
    }
}
