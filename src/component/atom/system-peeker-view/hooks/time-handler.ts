/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type RefObject, useCallback, useEffect, useMemo, useState } from "react";

import type { SystemPeekerRenderer } from "@/lib/renderer";
import { unixTimestampToJulianDateTT } from "@/lib/renderer/orbit";


export function useSystemPeekerTimeManager(systemPeeker: RefObject<SystemPeekerRenderer | undefined>) {
    // Wall clock used to track time.
    const [wallClock, setWallClock] = useState<number>(() => unixTimestampToJulianDateTT(Date.now()));
    const [simulationSpeed, setSimulationSpeed] = useState(100000000000);

    // Callback function used to propagate the current time to the peeker.
    const propagateTimeUpdates = useCallback(function propagateWallClockToSystemPeeker(offsetMilliseconds: number) {
        if (!systemPeeker.current) {
            return;
        }

        systemPeeker.current.updateCurrentTime(value => value + offsetMilliseconds / 86_400_000);
    }, [systemPeeker]);

    // Auto-update the wall clock on the window's animation frame timer.
    useEffect(function registerWallClockUpdate(): VoidFunction {
        let lastFrameTime: number | null = null;
        let frame = window.requestAnimationFrame(function updateWallClock(time) {
            // We have to skip the first frame because we don't know the initial timestamp of the registration.
            if (lastFrameTime !== null) {
                const offset = (time - lastFrameTime) / 1000 * simulationSpeed;
                setWallClock(wallClock => wallClock + offset);
                propagateTimeUpdates(offset);
            }

            lastFrameTime = time;
            frame = window.requestAnimationFrame(updateWallClock);
        });

        return function unregisterWallClockUpdate() {
            window.cancelAnimationFrame(frame);
        };
    }, [propagateTimeUpdates, simulationSpeed]);

    return useMemo(function buildManagerApi() {
        return {
            get wallClock() {
                return wallClock;
            },
            get date() {
                return new Date(wallClock);
            },
            get simulationSpeed() {
                return simulationSpeed;
            },
            setSimulationSpeed
        };
    }, [wallClock, setSimulationSpeed, simulationSpeed]);
}