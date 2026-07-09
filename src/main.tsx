/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Cydonia from "@/component/organism/cydonia";
import { initialiseI18n } from "@/lib/i18n";


await initialiseI18n();

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Could not find the application root element.");
}

createRoot(rootElement)
    .render(<StrictMode><Cydonia /></StrictMode>);
