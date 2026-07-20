/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { it, expect } from "bun:test";
import defineViteConfig from "./index";

it("should generate the basic Vite configuration", function () {
    const config: any = defineViteConfig();

    expect(config.plugins).toBeDefined();
    expect(config.plugins[0][0].name).toBe("vite:react-babel");
    expect(config.plugins[1][0].name).toBe("@tailwindcss/vite:scan");
});
