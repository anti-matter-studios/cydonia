/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

/** The time taken to pan the camera to a new position. */
export const CAMERA_PAN_TIME_SECONDS = 2;

/** The damping factor for camera tracking. */
export const CAMERA_TRACKING_DAMPING = 2;

/** Default clip planes of the camera. */
export const CAMERA_DEFAULT_CLIP_PLANES = { near: 0.001, far: 10_000 } as const;
