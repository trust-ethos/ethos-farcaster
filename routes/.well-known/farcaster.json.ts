import { type Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET() {
    const manifest = {
      "accountAssociation": {
        "header": "eyJmaWQiOjM2MjEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhiNzBkMjIzN2M5NzJiMDk1MzZlYjNlNzMxZjAxMGY4N2Y4MmM5NzRlIn0",
        "payload": "eyJkb21haW4iOiJldGhvcy1mYXJjYXN0ZXIuZGVuby5kZXYifQ",
        "signature": "MHg3MjQzOThlNGQ4YWJkNGVlNzI4NDIwNGJhNTc2N2FkM2E2ZjY0ZDZiNjc2NzIwNWFiNzEwNDNlNGE0YzQ3NzEwNTk1YjdlNWY1NzA0YzI5ZjM0OGQ3ZjhkNzA3NzI4MzVjNDcxMzE5ODQyYWQ4ZDhmMzhmNmE2NzNlZjcxMzE4MTFi"
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