/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import i18n, { type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next";

import blog from "@/locales/en/blog.yaml";
import common from "@/locales/en/common.yaml";
import home from "@/locales/en/home.yaml";


export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = [DEFAULT_LANGUAGE] as const;
export const TRANSLATION_NAMESPACES = ["common", "home", "blog"] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];
export type TranslationNamespace = typeof TRANSLATION_NAMESPACES[number];

const resources = {
    en: {
        blog: blog as ResourceLanguage,
        common: common as ResourceLanguage,
        home: home as ResourceLanguage
    }
} satisfies Record<SupportedLanguage, Record<TranslationNamespace, ResourceLanguage>>;

/** Loads the statically bundled translation resources into i18next. */
export async function initialiseI18n() {
    if (i18n.isInitialized) {
        return i18n;
    }

    await i18n
        .use(initReactI18next)
        .init({
            defaultNS: "common",
            fallbackLng: DEFAULT_LANGUAGE,
            fallbackNS: "common",
            lng: DEFAULT_LANGUAGE,
            ns: [...TRANSLATION_NAMESPACES],
            resources,
            supportedLngs: [...SUPPORTED_LANGUAGES],
            interpolation: {
                escapeValue: false
            },
            react: {
                useSuspense: false
            }
        });

    return i18n;
}

export { i18n };
