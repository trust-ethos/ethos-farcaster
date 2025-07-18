// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_well_known_farcaster_json from "./routes/.well-known/farcaster.json.ts";
import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_attestation from "./routes/api/attestation.ts";
import * as $api_cast_credibility from "./routes/api/cast-credibility.ts";
import * as $api_credibility_fid_ from "./routes/api/credibility/[fid].ts";
import * as $api_webhook from "./routes/api/webhook.ts";
import * as $cast_test from "./routes/cast-test.tsx";
import * as $credibility from "./routes/credibility.tsx";
import * as $demo_cast from "./routes/demo-cast.tsx";
import * as $index from "./routes/index.tsx";
import * as $miniapp from "./routes/miniapp.tsx";
import * as $og_image_png from "./routes/og-image.png.tsx";
import * as $splash_png from "./routes/splash.png.tsx";
import * as $test from "./routes/test.tsx";

import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/.well-known/farcaster.json.ts": $_well_known_farcaster_json,
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/attestation.ts": $api_attestation,
    "./routes/api/cast-credibility.ts": $api_cast_credibility,
    "./routes/api/credibility/[fid].ts": $api_credibility_fid_,
    "./routes/api/webhook.ts": $api_webhook,
    "./routes/cast-test.tsx": $cast_test,
    "./routes/credibility.tsx": $credibility,
    "./routes/demo-cast.tsx": $demo_cast,
    "./routes/index.tsx": $index,
    "./routes/miniapp.tsx": $miniapp,
    "./routes/og-image.png.tsx": $og_image_png,
    "./routes/splash.png.tsx": $splash_png,
    "./routes/test.tsx": $test,
  },
  islands: {},
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
