# Implementation Plan

This plan builds Cydonia into a React portfolio where Anti-Matter Studios projects appear as real minor-planet positions in the solar system.

## 1. Project Foundation

- Add a Vite + React + TypeScript app structure using Bun.
- Add linting, formatting, test runner, and basic CI-ready scripts.
- Create the first app shell with a full-viewport solar-system canvas and compact UI chrome.
- Define design tokens for color, type, spacing, focus states, and z-index layers.
- Add a project registry format with project name, Anti-Matter Studios metadata, MPC designation, links, status, media, and tags.
- Add Storybook as the visual library for atoms, molecules, organisms, and reusable core components.

## 2. MPC API Research And Data Layer

The MPC documentation currently lists REST APIs for WAMO, Submission Status, Designation Identifier, Observations, NEOCP Observations, Check Near-Duplicates, Orbits, Observatory Codes, MPECs, Action Codes, Lists of Objects, and Magnitude Bands.

For this app, implement the portfolio data flow around:

- `query-identifier`: resolve each project minor-planet name/designation to canonical MPC identifiers.
- `get-orb`: retrieve each resolved object's `mpc_orb` orbital data.
- `list`: optionally validate available object groups and support discovery/admin tooling.
- `get-obs`: defer to later project detail pages if observation history becomes part of the storytelling.

Build:

- `src/lib/mpc/client.ts` for typed MPC requests.
- `src/lib/mpc/schemas.ts` for runtime validation.
- `src/lib/mpc/rateLimit.ts` enforcing at most 5 requests per second.
- `scripts/sync-mpc-orbits.ts` to read the project registry and write generated orbit snapshots.
- `src/data/generated/orbits.json` containing raw MPC responses, normalized orbit fields, fetch timestamp, and documentation version notes.

Open questions to verify during implementation:

- Whether direct browser calls to `data.minorplanetcenter.net` have acceptable CORS behavior.
- Whether deployment should use build-time snapshots only, a serverless cache, or both.
- Which fields in `mpc_orb` are most stable for client-side propagation.

## 3. Orbital Model

- Define a normalized `MinorPlanetOrbit` model with source designation, epoch, semi-major axis or state vector, eccentricity, inclination, longitude of ascending node, argument of perihelion, mean anomaly, and uncertainty metadata when available.
- Implement orbital propagation in `src/lib/orbits`.
- Convert propagated positions into heliocentric Cartesian coordinates.
- Add unit tests for circular, eccentric, inclined, and missing-data cases.
- Add fixtures from known objects such as Ceres to protect against parser regressions.

## 4. Solar-System Scene

- Use Three.js for a full-viewport scene.
- Render the Sun, major orbit reference rings, project minor planets, labels, and selection states.
- Support pan, zoom, focus selected body, reset view, and time controls.
- Keep project markers visible without making bodies physically to-scale.
- Use real positions for placement and readable scaling for display.
- Add fallback markers for projects whose MPC data is unavailable.

## 5. Portfolio Experience

- Selecting a body opens a project inspector with project summary, role, stack, links, screenshots, and MPC metadata.
- Add filters for status, discipline, technology, and orbital class if useful.
- Add deep links for individual projects.
- Add keyboard navigation for cycling through bodies and opening details.
- Keep the first screen usable without onboarding text.

## 6. Audio System

- Add opt-in audio initialization after user interaction.
- Create a small cue library for hover, selection, discovery, time scrub, and focus transitions.
- Use original generated or recorded sounds only.
- Add mute, volume, and reduced-distraction behavior.
- Keep audio state independent of rendering state.

## 7. Performance And Resilience

- Cache generated MPC data and show its fetch timestamp.
- Avoid network calls during render loops.
- Lazy-load project media and audio.
- Use instancing or batched geometry if the number of bodies grows.
- Add loading, offline, and stale-data states.
- Keep the app useful even when MPC is unreachable.

## 8. Verification

- Unit test MPC normalization and orbital math.
- Integration test project registry to generated orbit snapshot.
- Use Playwright-based `e2e` tests to verify user workflows, desktop and mobile layouts, accessibility-critical flows, and canvas/rendering smoke checks.
- Keep Storybook stories current for reusable components and key visual states.
- Inspect canvas screenshots for nonblank rendering, readable labels, and no overlapping control text.
- Validate accessibility: keyboard selection, visible focus, semantic panel content, and audio controls.

## 9. Deployment Preparation

- Decide hosting after the app skeleton exists.
- If the project gets Sites hosting metadata, follow the Sites deployment workflow.
- Document the data refresh command and generated file policy.
- Add a short README once the implementation begins.
