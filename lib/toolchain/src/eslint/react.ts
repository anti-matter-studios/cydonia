/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { ESLint } from "eslint";
import { type Config, defineConfig } from "eslint/config";
import Accessibility from "eslint-plugin-jsx-a11y";
import React, { type ReactFlatConfig } from "eslint-plugin-react";
import ReactHooks from "eslint-plugin-react-hooks";
import Tailwind from "eslint-plugin-tailwindcss";

import BaseConfiguration from "./index.js";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const TailwindCSSRoot = resolve(fileURLToPath(import.meta.url), "../../../../ui/src/index.css");

/** Strict React and Tailwind configuration extending the Anti-Matter Studios base rules. */
export default defineConfig(BaseConfiguration, {
    name: "@anti-matter-studios/toolchain/eslint/react",
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [
        React.configs.flat["recommended"] as ReactFlatConfig,
        React.configs.flat["jsx-runtime"] as ReactFlatConfig,
        ReactHooks.configs.flat["recommended-latest"],
        Accessibility.flatConfigs.strict,
        Tailwind.configs.recommended as Config,
    ],
    plugins: { tailwindcss: Tailwind as unknown as ESLint.Plugin },
    settings: {
        react: { version: "detect" },
        tailwindcss: {
            cssConfigPath: TailwindCSSRoot,
        },
    },
    rules: {
        "jsx-a11y/control-has-associated-label": "error",
        "react/button-has-type": "error",
        "react/jsx-no-leaked-render": "error",
        "react/jsx-no-useless-fragment": "error",
        "react/no-array-index-key": "error",
        "react/no-danger": "error",
        "react/no-unstable-nested-components": "error",
        "react/self-closing-comp": "error",
        "react-hooks/exhaustive-deps": "error",
        "react-hooks/incompatible-library": "error",
        "react-hooks/unsupported-syntax": "error",
        "tailwindcss/classnames-order": "error",
        "tailwindcss/enforces-negative-arbitrary-values": "error",
        "tailwindcss/enforces-shorthand": "error",
        "tailwindcss/important-modifier-suffix": "error",
        "tailwindcss/no-custom-classname": "error",
        "tailwindcss/no-unnecessary-arbitrary-value": "error",
    },
});
