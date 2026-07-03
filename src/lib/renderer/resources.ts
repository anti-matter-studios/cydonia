/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { WebGLRenderer } from "three";
import { createSystemPeekerCamera, type SystemPeekerCamera } from "./control/camera";
import { createSystemPeekerSystem, type SystemPeekerSystem } from "./object";


/** List of resources used internally by the renderer. */
export interface SystemPeekerRendererResources extends Disposable {
    /** Target to render to. */
    target: HTMLCanvasElement | OffscreenCanvas;

    /** Three.js renderer object. */
    renderer: WebGLRenderer;

    /** Camera that should be used in the scene. */
    camera: SystemPeekerCamera;

    /** The scene created for the system peeker. */
    system: SystemPeekerSystem;
}

/**
 * Initialises the resources required by the renderer.
 *
 * @param target The target to render to.
 * @returns The resources required by the renderer.
 */
export function createSystemPeekerRendererResources(target: HTMLCanvasElement | OffscreenCanvas): SystemPeekerRendererResources {
    const camera = createSystemPeekerCamera();
    const renderer = new WebGLRenderer({
        canvas: target,
        alpha: true,
        antialias: true,
        powerPreference: "low-power"
    })

    let resizeObserver: ResizeObserver | undefined;
    if (target instanceof HTMLCanvasElement) {
        const canvas = target;
        resizeObserver = new ResizeObserver(function onResized() {
            camera.resize(canvas.width, canvas.height);
            renderer.setSize(canvas.width, canvas.height);
        });
        resizeObserver.observe(target);
    }

    return {
        target,
        renderer,
        camera,
        system: createSystemPeekerSystem(),
        [Symbol.dispose](): void {
            resizeObserver?.disconnect();
            this.renderer.dispose();
        }
    };
}