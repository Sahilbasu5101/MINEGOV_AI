# MineGov AI Mobile Architecture

MineGov AI Mobile is an Android-first, iOS-compatible Expo field-reporting client for Safety, Environment, Production, and Labour Regulation compliance. It supports field inspection, observations, evidence, GPS/time capture, drafts, offline work, and submission. Dashboards, approval, analytics, and corrective-action management belong to the web application.

## Roles, routing, and state

Only Sirdar, Safety Inspector, Technical / Competent Person (Safety), Environment Officer, Production Officer, and Welfare Officer belong here. `src/permissions/access-control.ts` is the central role-to-domain mapping. Expo Router owns the `(main)`, `(auth)`, and domain route areas. Auth state lives in `AuthProvider`; the development auth service is replaceable by a backend adapter. Domain placeholders intentionally return to Main until their reference screens are supplied.

## Offline, evidence, GPS, and services

`src/offline` owns shared lifecycle (`DRAFT`, `PENDING_SYNC`, `SUBMITTED`, `UNDER_REVIEW`, `VERIFIED`, `CLOSED`) and sync contracts. `src/storage` persists local session data and will hold drafts and queues. Service contracts define reusable real GPS capture and evidence metadata (report/user/timestamp/GPS/local/server references); no fabricated coordinates. UI stays separate from backend, sync, and assistive-AI adapters. AI is advisory only.

## Design system

`src/constants/theme.ts` centralizes MineGov’s light surfaces, navy text, primary blue, semantic status colors, spacing, and radii. Supplied reference images are visual specifications, not inspiration.
