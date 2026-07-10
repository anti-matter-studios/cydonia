/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type Camera, type Object3D, WebGLRenderer } from "three";


/** Resources used by the renderer to draw the current scene. */
export interface RendererResources {
    /**
     * Renders the provided scene, with the given camera.
     *
     * @param root The root {@link Object3D} of the scene that should be rendered.
     * @param camera The camera to render the scene with.
     */
    render(root: Object3D, camera: Camera): void;

    /**
     * Resizes the render's draw target.
     *
     * @param width The new width of the rendering area.
     * @param height The new height of the rendering area.
     */
    resize(width: number, height: number): void;

    /** Disposes of the underlying renderer. */
    dispose(): void;
}

/**
 * Initialises the resources required by the renderer.
 *
 * @param target The target to render to.
 * @returns The resources required by the renderer.
 */
export function createRendererResources(target: HTMLCanvasElement | OffscreenCanvas): RendererResources {
    const renderer = new WebGLRenderer({
        canvas: target,
        alpha: true,
        antialias: true,
        powerPreference: "low-power"
    });

    return {
        render(root: Object3D, camera: Camera): void {
            renderer.render(root, camera);
        },
        resize(width: number, height: number): void {
            renderer.setSize(width, height, false);
        },
        dispose(): void {
            renderer.dispose();
        }
    };
}