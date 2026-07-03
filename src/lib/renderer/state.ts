/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { unixTimestampToJulianDateTT } from "./orbit";


/** Global state of the system peeker renderer. */
export interface SystemPeekerRendererState {
    /** Current simulation time, in terrestrial time julian days. */
    currentTimeTTJD: number;

    /** Identifier of the last registered animation frame, if any. */
    lastAnimationFrameId?: number;
}

/**
 * Creates the initial state of the system peeker renderer.
 *
 * Uses the current time as a starting point for the simulation.
 *
 * @returns The generated, mutable state object.
 */
export function createSystemPeekerRendererState(): SystemPeekerRendererState {
    return {
        currentTimeTTJD: unixTimestampToJulianDateTT(Date.now()),
    };
}
