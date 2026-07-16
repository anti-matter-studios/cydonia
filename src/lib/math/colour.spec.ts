/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { expect, it } from "vitest";

import { hslToHex, hslToRgb, rgbToHex } from "@/lib/math/colour";


it("should convert primary HSL colours to hexadecimal", function() {
    expect(hslToHex({ hue: 0, saturation: 1, lightness: 0.5 })).toBe("ff0000");
    expect(hslToHex({ hue: 120, saturation: 1, lightness: 0.5 })).toBe("00ff00");
    expect(hslToHex({ hue: 240, saturation: 1, lightness: 0.5 })).toBe("0000ff");
});

it("should wrap hue values before conversion", function() {
    expect(hslToHex({ hue: 480, saturation: 1, lightness: 0.5 })).toBe("00ff00");
});

it("should clamp channels when formatting RGB as hexadecimal", function() {
    expect(rgbToHex({ red: -10, green: 127.5, blue: 300 })).toBe("0080ff");
});

it("should expose the intermediate RGB conversion", function() {
    expect(hslToRgb({ hue: 60, saturation: 1, lightness: 0.5 })).toEqual({
        red: 255,
        green: 255,
        blue: 0
    });
});
