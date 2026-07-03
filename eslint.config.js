/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tailwindcss from "eslint-plugin-tailwindcss";
import tseslint from "typescript-eslint";

const projectClassNames = [
    "space",
    "panel",
];

export default tseslint.config(
    {
        ignores: [
            "coverage",
            "dist",
            "node_modules",
            "playwright-report",
            "storybook-static",
            "test-results"
        ]
    },
    js.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            ...tseslint.configs.strictTypeChecked,
            ...tseslint.configs.stylisticTypeChecked
        ],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            },
            globals: {
                ...globals.browser,
                ...globals.es2022
            }
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
            "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
            "@typescript-eslint/consistent-type-imports": [
                "error",
                { fixStyle: "inline-type-imports", prefer: "type-imports" }
            ],
            "@typescript-eslint/no-confusing-void-expression": [
                "error",
                { ignoreArrowShorthand: true }
            ],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                    varsIgnorePattern: "^_"
                }
            ],
            "@typescript-eslint/restrict-template-expressions": [
                "error",
                { allowBoolean: true, allowNullish: true, allowNumber: true }
            ],
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true }
            ]
        }
    },
    {
        files: ["src/**/*.{ts,tsx}"],
        plugins: {
            tailwindcss
        },
        settings: {
            tailwindcss: {
                cssConfigPath: "src/style/index.css"
            }
        },
        rules: {
            "tailwindcss/classnames-order": "warn",
            "tailwindcss/enforces-negative-arbitrary-values": "warn",
            "tailwindcss/enforces-shorthand": "warn",
            "tailwindcss/no-arbitrary-value": "off",
            "tailwindcss/no-contradicting-classname": "error",
            "tailwindcss/no-custom-classname": [
                "warn",
                { whitelist: projectClassNames }
            ],
            "tailwindcss/no-unnecessary-arbitrary-value": "warn"
        }
    },
    {
        files: ["**/*.stories.{ts,tsx}"],
        rules: {
            "react-refresh/only-export-components": "off"
        }
    },
    {
        files: ["*.config.{ts,js}", "eslint.config.js"],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2022
            }
        }
    }
);
