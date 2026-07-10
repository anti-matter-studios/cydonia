/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import { unixTimestampToJulianDateTDB, type UnixTimestampUTC } from "@/lib/math";
import { brand } from "@/lib/utils";
import type { PlanetData } from "@/lib/schemas";

import { RendererContext } from ".";


/** Provides the {@link RendererContext} in the virtual DOM tree. */
export function RendererContextProvider({ children, simulationRate = 30 }: RendererContextProviderProps) {
    const [simulationSpeed, setSimulationSpeed] = useState(30 * 86_400);
    const [wallClockTime, setWallClockTime] = useState<UnixTimestampUTC>(brand(0));
    const [bodies, setBodies] = useState<Record<string, PlanetData>>({});

    useEffect(function registerWallClockHandler(): VoidFunction {
        let lastFrameTimeMilliseconds = performance.now();
        const timeout = setInterval(function updateWallClockTime() {
            const now = performance.now();
            const deltaTimeMilliseconds = now - lastFrameTimeMilliseconds;
            lastFrameTimeMilliseconds = now;
            setWallClockTime(time => brand(time + deltaTimeMilliseconds * simulationSpeed));
        }, 1 / simulationRate);

        return function cleanupWallClockHandler() {
            clearInterval(timeout);
        };
    }, [simulationSpeed, simulationRate]);

    const registerPlanet = useCallback(function(data: PlanetData): PlanetData {
        setBodies(function(bodies) {
            return { ...bodies, [data.designation]: data };
        });

        return data;
    }, []);

    const unregisterPlanet = useCallback(function(data: PlanetData | string) {
        setBodies(function(bodies) {
            if (typeof data === "object") {
                data = data.designation;
            }
            const { [data]: _, ...rest } = bodies;

            return rest;
        });
    }, []);

    const value = useMemo(function createRendererContext(): RendererContext {
        return {
            wallClockUTC: wallClockTime,
            wallClockJD: unixTimestampToJulianDateTDB(wallClockTime),
            simulationSpeedSecondsPerSecond: simulationSpeed,
            bodies,
            updateSimulationWallClock: setWallClockTime,
            setSimulationSpeed,
            registerPlanet,
            unregisterPlanet,
        };
    }, [wallClockTime, simulationSpeed, bodies, registerPlanet, unregisterPlanet]);

    return <RendererContext value={value} children={children} />;
}

export interface RendererContextProviderProps extends PropsWithChildren {
    /** The number of simulation updates per second. Defaults to 30. */
    simulationRate?: number;
}