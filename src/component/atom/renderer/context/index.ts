/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { createContext } from "react";
import { unixTimestampToJulianDateTDB, type UnixTimestampUTC } from "@/lib/math";
import { brand } from "@/lib/utils";
import type { SimulationState } from "@/lib/renderer/state";
import type { PlanetData } from "@/lib/schemas";

export * from "./provider";


/** Context exposed for the {@link SystemPeekerSimulator}. */
export interface RendererContext extends SimulationState {
    /** Current speed of the simulation, in simulated seconds per real-time second. */
    readonly simulationSpeedSecondsPerSecond: number;

    /**
     * Registers a new planet body to the simulation state.
     *
     * The body does not have to be an existing game object,
     * its data is only used by other objects to retrieve information about the planet.
     *
     * @param data The body to register.
     */
    registerPlanet(this: void, data: PlanetData): PlanetData;

    /**
     * Unregisters a planet body from the simulation state.
     *
     * If the planet was never registered, this function does nothing.
     *
     * @param data The body to unregister, or its designation.
     */
    unregisterPlanet(this: void, data: PlanetData | string): void;

    /**
     * Updates the wall clock of the simulation to the given time.
     *
     * @param wallClockTimestamp The new time of the simulation.
     */
    updateSimulationWallClock(this: void, wallClockTimestamp: UnixTimestampUTC): void;

    /**
     * Updates the {@link simulationSpeedSecondsPerSecond} of the simulation state.
     *
     * @param speed The new speed of the simulation, in simulated seconds per real-time second.
     */
    setSimulationSpeed(this: void, speed: number): void;
}

export const RendererContext = createContext<RendererContext>({
    wallClockUTC: brand(Date.now()),
    simulationSpeedSecondsPerSecond: 1,
    wallClockJD: unixTimestampToJulianDateTDB(brand(Date.now())),
    bodies: {},
    registerPlanet(data) {
        console.warn("Invoked a no-op implementation of RendererContext.registerPlanet");
        return data;
    },
    unregisterPlanet() {
        console.warn("Invoked a no-op implementation of RendererContext.unregisterPlanet");
    },
    setSimulationSpeed() {
        console.warn("Invoked a no-op implementation of RendererContext.setSimulationSpeed");
    },
    updateSimulationWallClock() {
        console.warn("Invoked a no-op implementation of RendererContext.updateSimulationWallClock");
    },
});
