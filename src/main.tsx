/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Cydonia from "@/component/organism/cydonia";
import "@/style/index.css";

createRoot(document.getElementById("root") as HTMLElement)
    .render(<StrictMode><Cydonia /></StrictMode>);
