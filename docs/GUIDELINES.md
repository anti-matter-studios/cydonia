# Project Guidelines

These rules define how Cydonia should be built as the Anti-Matter Studios portfolio.

## Product Direction

- Build a React-based portfolio app, not a marketing landing page.
- The first screen should be the usable solar-system portfolio map.
- Projects are represented by the minor planets they are named after.
- Real orbital data is part of the identity of the project. Do not fake orbital placement when real data is available.
- The mood should be scientific, quiet, playful, and slightly strange: Spaceplan-inspired interface economy, Outer Wilds-inspired discovery and audio warmth, and original Anti-Matter Studios art direction.
- Do not copy copyrighted UI, music, sound effects, melodies, logos, or game assets from inspirations.

## Technical Stack

- Use Bun as the package manager and script runner.
- Use React with TypeScript.
- Prefer Vite for the React app unless a later hosting decision makes another framework clearly better.
- Use Three.js for any 3D solar-system rendering.
- Keep domain logic separate from React components.
- Prefer small typed modules over broad utility files.
- APIs must be well documented, typed, and clearly separated from rendering and domain logic.
- Views must be view only. They render data and callbacks provided by parents, and implement no business logic.
- Business logic must live in dedicated custom hooks and/or dedicated non-view modules.
- All components must live in their own files and expose clear, narrow boundaries.
- Keep files between 100 and 200 lines whenever possible. Files may exceed this only when splitting would make the code harder to understand, and the exception should be rare.

Required source boundaries:

- `src/atoms`: pure visual components that render data provided by parents. Atoms implement no business logic.
- `src/molecules`: components that compose atoms and render data they manipulate locally. Molecules should contain as little visual implementation as possible, and business logic must be implemented through custom hooks.
- `src/organisms`: higher-order layouts that arrange molecule and atom items into pages or page-level sections.
- `src/lib/core`: common core components and primitives that can be reused across the repo.
- `src/lib/hooks`: reusable hooks that do not belong to a particular molecule.
- `src/lib/api`: RTK Query-based query logic used to retrieve data from third parties. API modules must document endpoints, inputs, outputs, rate limits, caching behavior, and data provenance.
- `src/config`: configuration for Vite and other development tools, including ESLint, Vitest, Storybook, and related project tooling.
- `src/styles`: design tokens and global styles.
- `src/data`: hand-authored project metadata and generated MPC snapshots.
- `e2e`: Playwright-based end-to-end tests that cover user workflows, viewport behavior, accessibility-critical paths, and canvas/rendering smoke checks.
- `.storybook`: Storybook configuration for the component visual library.

Component and logic rules:

- A component file should export one component by default, plus types only when they are part of that component's public API.
- Components should receive already-shaped display data whenever possible.
- Every atom, molecule, organism, and reusable core component should have a Storybook story once its public API stabilizes.
- Storybook stories should document visual states, responsive behavior, interaction states, loading states, empty states, and error states where applicable.
- Derived state, selection rules, formatting rules, data loading, filtering, audio state, orbit calculations, and third-party API calls do not belong in atoms or organisms.
- Molecule-specific logic belongs in a nearby custom hook. Shared logic belongs in `src/lib/hooks`.
- Domain logic that is not React-specific belongs in a dedicated typed module instead of a component or hook.
- RTK Query endpoints and third-party clients belong in `src/lib/api`; components and hooks should consume their typed public API rather than constructing requests directly.
- Public hooks, APIs, and shared modules should include concise documentation describing responsibility, inputs, outputs, side effects, and failure behavior.

## MPC Data Rules

Use the official MPC documentation as the source of truth:

- MPC services: https://docs.minorplanetcenter.net/services/
- MPC APIs: https://docs.minorplanetcenter.net/mpc-ops-docs/apis/
- Orbits API: https://docs.minorplanetcenter.net/mpc-ops-docs/apis/get-orb/
- MPC_ORB JSON: https://docs.minorplanetcenter.net/mpc-ops-docs/orbits/mpc-orb-json/

Relevant APIs:

- `query-identifier`: resolve names, permanent ids, packed ids, and provisional designations. It supports up to 100 designations per request.
- `get-orb`: fetch orbital elements and related parameters in `mpc_orb` JSON format. It currently supports single-object queries.
- `list`: discover groups such as `minor-planets`, `neos`, `main-belters`, `tnos`, `jovian-trojans`, `minor-planet-names`, and related categories.
- `get-obs`: fetch observational history for future project detail views.

Less relevant for the portfolio:

- WAMO, Submission Status, Action Codes, CND, NEOCP Observations, Observatory Codes, MPECs, and Magnitude Bands are useful MPC services, but should not be part of the first portfolio path unless a feature specifically needs them.

Implementation rules:

- Never call MPC APIs from animation loops or high-frequency UI events.
- Respect the documented MPC rate limit: at most 5 requests per second to `https://data.minorplanetcenter.net/api/`.
- Add client-side and build-time rate limiting, retry `429` responses with backoff, and cache successful responses.
- Prefer a build-time ingestion script that writes versioned generated orbit snapshots into `src/data/generated`.
- Preserve the raw `mpc_orb` response alongside the normalized app model so schema changes can be debugged.
- Treat the MPC_ORB schema as evolving while it remains version `0.x`.
- Validate all network data before it enters app state.

## Orbit Rules

- Store source orbital elements with units and epoch metadata.
- Normalize all angles to radians internally.
- Normalize distances to astronomical units internally.
- Use a tested Kepler solver for position propagation.
- Keep orbital calculation deterministic and independent of rendering.
- Render a clear fallback state when an orbit cannot be resolved.
- Surface data provenance in development tools and project detail views.

## UI Rules

- The solar-system scene is the primary interface.
- Controls should be compact, icon-first where possible, and discoverable with tooltips.
- Avoid nested cards and decorative card stacks.
- Keep cards at 8px radius or less.
- Use stable dimensions for panels, labels, toolbar controls, and project markers.
- Do not let labels, tooltips, or project titles resize the orbital scene.
- Text must fit on mobile and desktop without overlap.
- Use a palette with real contrast and multiple temperature families. Avoid a one-note dark blue, purple, beige, or orange theme.
- Respect `prefers-reduced-motion`.
- Keep keyboard navigation and screen-reader labels for all project selection paths.

## Audio Rules

- Audio must be opt-in after a user gesture.
- Always provide mute and volume controls.
- Respect reduced-motion/reduced-distraction preferences where possible.
- Use original audio assets or generated/original synthesis only.
- Audio cues should reinforce selection, discovery, time movement, and major state changes.
- Avoid looping fatigue. Silence is allowed.

## Testing And Quality

- Unit test orbital math and MPC data normalization.
- Add integration tests for project-to-minor-planet resolution.
- Add visual regression checks for the solar-system scene once the canvas exists.
- Use Playwright in `e2e` for end-to-end user workflows, viewport checks, accessibility-critical flows, and canvas/rendering smoke checks after the UI is implemented.
- Maintain Storybook as the visual library for all reusable atoms, molecules, organisms, and core components.
- Keep generated data reproducible and document the generation command.
- Do not commit secrets or API keys. The currently documented MPC APIs used here are public.
