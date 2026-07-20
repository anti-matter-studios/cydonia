/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { expect, it } from "bun:test";
import { ESLint } from "eslint";

import BaseConfiguration from "./index";

it("enables strict type-aware base rules", async function () {
    const eslint = new ESLint({
        overrideConfig: BaseConfiguration,
        overrideConfigFile: true,
    });
    const configuration = await eslint.calculateConfigForFile("src/example.ts");

    expect(configuration?.rules?.["@typescript-eslint/no-floating-promises"]?.[0]).toBe(2);
    expect(configuration?.rules?.["@typescript-eslint/strict-boolean-expressions"]?.[0]).toBe(2);
    expect(configuration?.rules?.["import-x/no-cycle"]?.[0]).toBe(2);
});

it("runs in a less strict mode for test files", async function () {
    const eslint = new ESLint({
        overrideConfig: BaseConfiguration,
        overrideConfigFile: true,
    });
    const configuration = await eslint.calculateConfigForFile("src/example.spec.tsx");

    expect(configuration?.rules?.["complexity"]?.[0]).toBe(0);
    expect(configuration?.rules?.["@typescript-eslint/no-explicit-any"]?.[0]).toBe(0);
    expect(configuration?.rules?.["@typescript-eslint/no-unsafe-assignment"]?.[0]).toBe(0);
    expect(configuration?.rules?.["@typescript-eslint/no-unsafe-member-access"]?.[0]).toBe(0);
});
