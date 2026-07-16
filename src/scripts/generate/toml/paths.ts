/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { resolve } from "node:path";

/** Path to the root of the repository. */
export const REPOSITORY_ROOT = resolve(import.meta.dir, "../../../..");

/** Path to the directory containing all the planet TOML descriptors. */
export const PLANET_DATA_DIRECTORY = resolve(REPOSITORY_ROOT, "src/data/planets");

/** Path to the file that exports the planet data. */
export const PLANET_MODULE_PATH = resolve(PLANET_DATA_DIRECTORY, "index.ts");
