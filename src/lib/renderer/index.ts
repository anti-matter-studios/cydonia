/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { createSystemPeekerRendererState } from "./state";
import { createSystemPeekerRendererResources } from "./resources";

/** API exposed by the {@link createSystemPeekerRenderer} object. */
export interface SystemPeekerRenderer extends Disposable {
    /**
     * Registers the rendering loop through the {@link window.requestAnimationFrame} system.
     *
     * This provides a smooth rendering pipeline loop for the simulation.
     */
    start(): void;

    /** Clears the registered rendering loop. */
    stop(): void;

    /**
     * Updates the size of the rendering target.
     *
     * Updates the camera to ensure that draw calls are rendered correctly.
     *
     * @param width The width of the rendering target.
     * @param height The height of the rendering target.
     */
    resize(width: number, height: number): void;

    /**
     * Updates the current time of the simulation.
     *
     * This is independent of the {@link render} loop and does not update the simulation state.
     *
     * @param value The new wall clock time of the simulation, as a Terrestrial Time Julian Day.
     */
    updateCurrentTime(value: number | ((current: number) => number)): void;
}

export function createSystemPeekerRenderer(target: HTMLCanvasElement | OffscreenCanvas): SystemPeekerRenderer {
    const state = createSystemPeekerRendererState();
    const resources = createSystemPeekerRendererResources(target);

    let previousFrameTimestamp: number;
    if (document.timeline.currentTime) {
        if (typeof CSSStyleValue !== "undefined" && document.timeline.currentTime instanceof CSSStyleValue) {
            previousFrameTimestamp = document.timeline.currentTime.to("s").value;
        } else {
            previousFrameTimestamp = document.timeline.currentTime as number;
        }
    } else {
        previousFrameTimestamp = performance.now();
    }

    return {
        updateCurrentTime(value) {
            if (typeof value === "function") {
                state.currentTimeTTJD = value(state.currentTimeTTJD);
            } else {
                state.currentTimeTTJD = value;
            }
        },
        start() {
            if (state.lastAnimationFrameId) {
                return;
            }

            state.lastAnimationFrameId = window.requestAnimationFrame(function renderLoop(timestamp) {
                // Update the scene.
                resources.system.update((timestamp - previousFrameTimestamp) / 1000, state);
                previousFrameTimestamp = timestamp;

                // Render the scene.
                resources.renderer.render(resources.system.root.object, resources.camera.camera);

                state.lastAnimationFrameId = window.requestAnimationFrame(renderLoop);
            });
        },
        stop() {
            if (!state.lastAnimationFrameId) {
                return;
            }

            window.cancelAnimationFrame(state.lastAnimationFrameId);
            delete state.lastAnimationFrameId;
        },
        resize(width: number, height: number) {
            resources.camera.resize(width, height);
            resources.renderer.setSize(width, height);
        },
        [Symbol.dispose]() {
            this.stop();
            resources[Symbol.dispose]();
        }
    };
}