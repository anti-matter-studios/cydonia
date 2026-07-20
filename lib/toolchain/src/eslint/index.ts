/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { defineConfig } from "eslint/config";
import JavaScript from "@eslint/js";
import TypeScript from "typescript-eslint";
import Import from "eslint-plugin-import-x";

export default defineConfig(
    {
        name: "@anti-matter-studios/toolchain/eslint",
        files: ["**/*.{js,jsx,ts,tsx}"],
        extends: [JavaScript.configs.recommended, ...TypeScript.configs.strictTypeChecked],
        languageOptions: { parserOptions: { projectService: true } },
        plugins: { "import-x": Import },
        rules: {
            complexity: ["error", 10],
            curly: ["error", "all"],
            eqeqeq: ["error", "always", { null: "ignore" }],
            "max-depth": ["error", 3],
            "max-lines-per-function": ["error", { max: 60, skipBlankLines: true, skipComments: true }],
            "max-params": ["error", 4],
            "no-console": ["error", { allow: ["assert", "error", "warn"] }],
            "no-else-return": ["error", { allowElseIf: false }],
            "no-param-reassign": ["error", { props: true }],
            "no-restricted-syntax": [
                "error",
                {
                    selector: "TSEnumDeclaration[const=false]",
                    message: "Use a literal union or an `as const` object instead of a runtime enum.",
                },
            ],
            "no-warning-comments": ["error", { terms: ["fixme"], location: "anywhere" }],
            "prefer-const": ["error", { destructuring: "all" }],
            "@typescript-eslint/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: true }],
            "@typescript-eslint/consistent-type-imports": [
                "error",
                { disallowTypeAnnotations: true, fixStyle: "inline-type-imports", prefer: "type-imports" },
            ],
            "@typescript-eslint/explicit-module-boundary-types": "error",
            "@typescript-eslint/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true }],
            "@typescript-eslint/no-explicit-any": ["error", { fixToUnknown: true, ignoreRestArgs: false }],
            "@typescript-eslint/no-import-type-side-effects": "error",
            "@typescript-eslint/no-unnecessary-condition": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                    varsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/prefer-readonly": "error",
            "@typescript-eslint/promise-function-async": "error",
            "@typescript-eslint/return-await": ["error", "in-try-catch"],
            "@typescript-eslint/strict-boolean-expressions": [
                "error",
                {
                    allowAny: false,
                    allowNullableBoolean: false,
                    allowNullableEnum: false,
                    allowNullableNumber: false,
                    allowNullableObject: false,
                    allowNullableString: false,
                    allowNumber: false,
                    allowString: false,
                },
            ],
            "@typescript-eslint/switch-exhaustiveness-check": [
                "error",
                { allowDefaultCaseForExhaustiveSwitch: false, considerDefaultExhaustiveForUnions: false },
            ],
            "import-x/first": "error",
            "import-x/newline-after-import": "error",
            "import-x/no-absolute-path": "error",
            "import-x/no-cycle": ["error", { ignoreExternal: true }],
            "import-x/no-duplicates": "error",
            "import-x/no-mutable-exports": "error",
            "import-x/no-self-import": "error",
            "import-x/no-useless-path-segments": "error",
        },
    },
    {
        name: "@anti-matter-studios/toolchain/eslint",
        files: ["**/*.{test,spec}.{ts,tsx,js,jsx}"],
        rules: {
            complexity: "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
        },
    },
);
