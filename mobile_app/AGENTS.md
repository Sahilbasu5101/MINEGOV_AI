# MineGov AI Mobile — working rules

1. Read `ARCHITECTURE.md` before modifying this project.
2. Provided UI references are authoritative. Preserve completed UI and reproduce only the next supplied screen.
3. Reuse shared components/tokens; do not change unrelated modules or add dependencies unnecessarily.
4. Do not invent screens, workflows, management dashboards, statutory requirements, or UX.
5. Keep Safety roles in Safety; Environment Officer in Environment; Production Officer in Production; Welfare Officer in Labour.
6. Keep access control centralized; retain offline-first, common report lifecycle, and reusable evidence/GPS contracts.
7. Test TypeScript and requested navigation after modifications.

## UI Reference Image Rules

Reference images are visual specifications for the MineGov application UI.

IMPORTANT:
Reference images may contain device mockups or presentation elements
that are NOT part of the actual application.

Never reproduce the following unless explicitly instructed:

- phone bezels
- device frames
- mock phone boundaries
- OS status bars shown inside the reference
- Wi-Fi/cellular indicators
- battery indicators
- Android/iOS navigation bars
- camera cutouts/notches
- device control overlays
- presentation borders or mockup backgrounds

Only reproduce the actual application UI contained inside the reference.

The React Native application must reconstruct the interface using real
React Native components rather than displaying the entire reference
image as a single background or image.

The actual Android/iOS operating system must provide:

- status bar
- system navigation area
- device-specific indicators

Preserve the visual appearance of the application content shown in the
reference, including:

- layout
- spacing
- typography
- colors
- cards
- buttons
- icons
- section hierarchy
- navigation

Do not treat the physical phone mockup in a reference image as part of
the application's UI.

## Development and Validation Rules

- Target Expo + React Native + TypeScript.
- Primary validation target is a physical Android device using Expo Go.
- Do not use Expo Web or Chrome as the primary mobile UI validation target.
- Do not run Node, TypeScript, Expo, or Metro commands with:
  `--max-old-space-size=8192`
- Prefer:
  `npx tsc --noEmit`
- Do not repeatedly run the same validation command unless the previous run failed or files changed.
- Keep implementation tasks small and focused.
- Do not rewrite large existing files when a smaller targeted change is sufficient.
- Do not modify completed screens unless explicitly requested.
- Before adding a dependency, check whether the existing Expo/React Native stack can solve the requirement.
- Preserve existing project structure and naming conventions.
- Do not fabricate GPS coordinates, sensor values, compliance results, or backend responses.
- When a backend/API is not implemented, use a clearly isolated mock/development adapter rather than hardcoding fake production behavior.