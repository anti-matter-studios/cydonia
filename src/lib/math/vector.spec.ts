/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { expect, it } from "vitest";

import { dot3 } from "@/lib/math/vector";


it("should compute the known 3D dot product", function() {
    expect(dot3(1, 2, 3, 4, 5, 6)).toBe(32);
});

it("should return zero for perpendicular vectors", function() {
    expect(dot3(1, 0, 0, 0, 1, 0)).toBe(0);
});

it("should preserve signs in opposing vectors", function() {
    expect(dot3(2, -3, 4, -5, 6, -7)).toBe(-56);
});
