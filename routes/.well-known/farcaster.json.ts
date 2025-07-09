import { type Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET() {
    const manifest = {
      "accountAssociation": {
        "header": "eyJmaWQiOjExMTI0MTMsInR5cGUiOiJhdXRoIiwia2V5IjoiMHg5OTJGNzRBMjE2NUEyZDA2NmMxNmQ4QTREOEUyNjNGNTBEMzA1NzE4In0",
        "payload": "eyJkb21haW4iOiJldGhvcy1mYXJjYXN0ZXIuZGVuby5kZXYifQ",
        "signature": "LrpMm3DB1ksgKJlCdBYYUU0vXNrfMKIJxFWXPou0BLcplrtB/SpCdDzbzkDtgKSgEydbglXAsj7WNjacYIWAfhs="
      },
      "frame": {
        "version": "1",
        "name": "Ethos Credibility Scores",
        "iconUrl": "https://ethos-farcaster.deno.dev/og-image.png", 
        "splashImageUrl": "https://ethos-farcaster.deno.dev/splash.png",
        "homeUrl": "https://ethos-farcaster.deno.dev/miniapp",
        "webhookUrl": "https://ethos-farcaster.deno.dev/api/webhook"
      }
    };

    return new Response(JSON.stringify(manifest, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  },

  async OPTIONS() {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  },
}; 