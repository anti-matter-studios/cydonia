/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { expect, it } from "bun:test";
import { ESLint } from "eslint";

import ReactConfiguration from "./react";

it("extends the base configuration with strict React and Tailwind rules", async function () {
    const eslint = new ESLint({
        overrideConfig: ReactConfiguration,
        overrideConfigFile: true,
    });
    const configuration = await eslint.calculateConfigForFile("src/example.tsx");

    expect(configuration?.rules?.["@typescript-eslint/no-floating-promises"]?.[0]).toBe(2);
    expect(configuration?.rules?.["jsx-a11y/alt-text"]?.[0]).toBe(2);
    expect(configuration?.rules?.["react-hooks/rules-of-hooks"]?.[0]).toBe(2);
    expect(configuration?.rules?.["react/button-has-type"]?.[0]).toBe(2);
    expect(configuration?.rules?.["tailwindcss/no-contradicting-classname"]?.[0]).toBe(2);
});
