/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

/// <reference types="vite/client" />

declare module "*.frag" {
    const source: string;
    export default source;
}

declare module "*.glsl" {
    const source: string;
    export default source;
}

declare module "*.vert" {
    const source: string;
    export default source;
}
