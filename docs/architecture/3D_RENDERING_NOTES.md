# 3D Rendering Notes

This note captures the current plan for adding Three.js rendering to Cydonia without turning every UI component into its own rendering engine.

## Goals

- Make the System Peeker feel like a real little solar system where each project is a body with position, orbit, and signal state.
- Keep the left Project Lister and right Word Outputer visually connected to the same project-body identities.
- Avoid one WebGL canvas per project row.
- Keep orbital math, app state, and rendering concerns separated.
- Preserve performance headroom for motion, interaction, audio, and future data-driven effects.

## Recommended Shape

Use one primary live WebGL canvas for the System Peeker, plus one secondary off-screen WebGL canvas that renders project-body thumbnails into an atlas.

```text
React app state
    |
    | selectedProjectId, hoveredProjectId, time, signal state
    v
Main System Peeker renderer
    - one visible WebGL canvas
    - live orbital view
    - picking, camera, signals, labels

Project Body Atlas renderer
    - one off-screen WebGL canvas
    - renders all project thumbnails into one sprite sheet
    - updates lazily or at low frame rate

React panels
    - Project Lister consumes atlas tiles
    - Word Outputer can consume a larger atlas tile or a dedicated selected preview
```

This gives Cydonia one coherent live solar-system scene while still allowing the side panels to use real 3D-rendered project bodies.

## Main System Peeker Canvas

The central System Peeker should be the primary Three.js scene.

It should render:

- Sun or system origin.
- Major orbit reference rings.
- Project and minor-planet bodies.
- Orbit traces.
- Signal pulses and read-activity indicators.
- Selection rings and hover/focus affordances.
- Camera pan, zoom, and focus transitions.
- Pointer picking and keyboard selection targets.

The main scene should be the source of truth for spatial interaction. React owns selected and hovered project state, but Three.js owns the rendering details.

## Interaction Model

The solar-system view should be directly explorable on desktop and mobile. Users should be able to zoom in and out, move through the orbital map, and select projects from their visible orbital positions.

Desktop interactions should include:

- Wheel or trackpad zoom.
- Drag-to-pan or orbit-map navigation.
- Pointer hover for project focus cues.
- Click or keyboard selection for project bodies.
- Keyboard navigation between nearby or listed projects.

Mobile interactions should include:

- Pinch-to-zoom.
- One-finger pan.
- Tap selection for project bodies.
- Large enough hit areas around small orbital bodies.
- Reduced label density when the viewport is tight.

Project selection should be bidirectional:

- Selecting a body in the System Peeker updates the selected row in the Project Lister and the selected project in the Word Outputer.
- Selecting a project from the left Project Lister should automatically pan and ease the camera to that project's current orbital position.
- If the selected project is outside the current view, the camera should bring it into view without disorienting jumps.
- The camera should preserve the user's zoom level when possible, only adjusting zoom if the selected project would remain unreadable or off-screen.

The camera behavior should feel like an instrument slewing to a target: calm, readable, and fast enough that the portfolio remains easy to scan.

## Project Body Atlas

The Project Body Atlas is a single off-screen WebGL renderer that produces a sprite sheet of project body thumbnails.

Example atlas:

```text
Off-screen WebGL canvas
┌────────┬────────┬────────┬────────┐
│ Cydonia│ Vesta  │ Pallas │ Juno   │
├────────┼────────┼────────┼────────┤
│ Hygiea │ ...    │ ...    │ ...    │
└────────┴────────┴────────┴────────┘
```

Each project gets a fixed tile. The renderer uses `setViewport()` and `setScissor()` to draw each body into its tile.

For each tile, store:

- Project id.
- Pixel bounds: `x`, `y`, `width`, `height`.
- UV bounds: `u0`, `v0`, `u1`, `v1`.
- Render status: pending, ready, stale, failed.
- Optional snapshot version or theme version.

The atlas should be regenerated only when needed:

- Initial load.
- Project visual identity changes.
- Theme or palette changes.
- Device pixel ratio changes.
- A selected or hovered body needs a refreshed animated frame.

Static rows can use cached tiles. Hovered or selected rows can be refreshed at a lower rate than the main scene, such as 6-12 fps.

## Displaying Atlas Tiles In React

DOM and CSS cannot directly treat one sub-region of a WebGL canvas as a normal image without a handoff. There are three reasonable display strategies.

### Option A: Tiny 2D Canvas Per Row

Each project row owns a small 2D canvas. It copies its atlas tile with `drawImage()`.

Pros:

- Simple mental model.
- Still only one WebGL canvas.
- Easy to update individual rows.

Cons:

- Multiple 2D canvases in the DOM.
- Needs row-level resize and draw coordination.

### Option B: One 2D Canvas Layer For The Project List

One visible 2D canvas sits over or under the list icon column and draws all visible atlas tiles in their row positions.

Pros:

- Very efficient for large lists.
- Minimal DOM canvas count.
- Good fit if the list becomes virtualized.

Cons:

- More careful layout synchronization.
- Accessibility and hit targets still need to live in normal DOM elements.

### Option C: Snapshot Tiles To Images

After rendering the atlas, each tile is converted to an `ImageBitmap`, blob URL, or similar image resource and displayed with normal `<img>` elements.

Pros:

- Easiest for mostly-static icons.
- Works naturally with DOM layout.
- Simple fallback behavior.

Cons:

- Less suited to animation.
- Snapshot management can create memory churn if updated often.

Recommended first path: use Option C or Option A for the left Project Lister, then graduate to Option B only if list performance or synchronization demands it.

## Right-Side Word Outputer Preview

The Word Outputer or Project Signal panel may need a larger, richer preview than the left list.

Two good paths:

- Use a larger atlas tile for the selected project.
- Use a dedicated selected-project preview renderer if the panel needs richer lighting, interaction, or animation than the list icons.

The atlas is likely enough for the first implementation. A dedicated selected preview can be added later if the right panel wants slow rotation, inspection, or stronger signal animation.

## Shared Project Body Visuals

Project body identity should be described once and reused everywhere.

```ts
interface ProjectBodyVisual {
    id: string;
    radius: number;
    colorPalette: string[];
    roughness: number;
    emissiveSignalColor: string;
    shapeSeed: string;
    textureSeed: string;
    orbitDisplayScale: number;
    signalStrength: number;
}
```

The main scene, atlas renderer, and any selected-project preview should all consume the same visual model. This keeps Cydonia's project bodies recognizable across the central map, left list, and right output panel.

## Render Scheduling

Use one scheduler to coordinate rendering work.

Suggested priorities:

- Main System Peeker: live while visible and while motion is enabled.
- Atlas: render once at startup, then refresh lazily.
- Hovered thumbnail: refresh at a low frame rate if animated.
- Selected thumbnail or right-panel preview: refresh at a moderate frame rate if animated.
- Hidden panels: no rendering.

The scheduler should respect:

- `prefers-reduced-motion`.
- Page visibility.
- Device pixel ratio changes.
- Resize events.
- WebGL context loss and restore.

Avoid animation loops inside individual React components. Components should subscribe to renderer outputs or request a tile refresh through a narrow API.

## State Flow

```text
Project registry + generated MPC orbit data
    |
    v
Orbit propagation and display model
    |
    v
React app state
    - selected project
    - hovered project
    - focused project
    - time controls
    - signal/read state
    |
    v
Render adapters
    - System Peeker scene
    - Project Body Atlas
    |
    v
React panels
    - Project Lister
    - Word Outputer
```

Orbit calculation should remain deterministic and independent of React and Three.js. Rendering should receive already-shaped positions, visual identities, and state flags.

## Suggested Source Boundaries

- `src/lib/orbits`: orbital elements, propagation, coordinate conversion, scaling helpers.
- `src/lib/scene`: Three.js scene builders, materials, meshes, labels, picking helpers.
- `src/lib/rendering`: renderer lifecycle, scheduler, resize handling, atlas renderer.
- `src/lib/hooks`: React hooks that connect app state to renderer adapters.
- `src/data`: project registry and generated MPC orbit snapshots.
- `src/component`: view components that mount canvases or display rendered atlas outputs.

The renderer modules should be framework-light where possible. React should mount, subscribe, and dispose; it should not contain scene construction logic.

## Phased Implementation

### Phase 1: Main Canvas Foundation

- Add Three.js.
- Create the visible System Peeker canvas.
- Render stars, sun, orbit rings, and basic project bodies.
- Add resize handling and lifecycle cleanup.
- Add a canvas smoke test that verifies the render is nonblank.

### Phase 2: Data And Orbit Model

- Add the project registry.
- Normalize project-body visual data.
- Wire generated MPC orbit snapshots into the display model.
- Keep fallback positions for unresolved orbit data.

### Phase 3: Interaction

- Add hover and selection picking.
- Sync selected project between the main scene, Project Lister, and Word Outputer.
- Add camera focus transitions.
- Pan the camera to a project's orbital position when selected from the left Project Lister.
- Add desktop zoom, drag/pan, and keyboard controls.
- Add mobile pinch-to-zoom, pan, and tap selection controls.
- Add keyboard navigation.

### Phase 4: Project Body Atlas

- Create the off-screen atlas renderer.
- Render all project body thumbnails into fixed tiles.
- Display left-list icons from atlas tiles.
- Cache static thumbnails and refresh only stale tiles.

### Phase 5: Right Panel Preview

- Reuse a larger atlas tile for the selected project.
- If needed, add a dedicated selected-project preview renderer later.
- Add selected body signal animation.

### Phase 6: Signals And Polish

- Add project signal pulses and activity effects.
- Add orbit sync and stale-data indicators.
- Respect reduced motion and page visibility.
- Add Storybook states and Playwright viewport checks.

## Decision Summary

- Use one visible WebGL canvas for the live System Peeker.
- Use one off-screen WebGL canvas for a project-body sprite atlas.
- Do not use one WebGL canvas per project row.
- Let React own app state and selection state.
- Let Three.js own rendering details.
- Keep orbital math outside React and outside Three.js.
- Start with static or lazily refreshed atlas tiles, then add animation only where it improves the experience.
