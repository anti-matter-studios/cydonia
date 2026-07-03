import type { OrbitalParameters } from "@/lib/renderer/orbit";


/** RGB colour values stored in shader-friendly 0-1 space. */
export type PlanetOrbitColour = readonly number[];

/** Source data used to render and place a planet in the orbital system. */
export interface PlanetOrbitData {
    /** Display name of the planet. */
    readonly designation: string;

    /** Colour palette used by the gradient shader. */
    readonly colours: {
        /** Colour used on the lit side of the gradient shader. */
        readonly light: PlanetOrbitColour;

        /** Colour used on the shaded side of the gradient shader. */
        readonly shaded: PlanetOrbitColour;
    };

    /** Temporary display radius, where the Sun's display radius is 10. */
    readonly scale: number;

    /** Orbital elements used for heliocentric placement. */
    readonly orbitalParameters: OrbitalParameters;
}
