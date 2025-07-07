import { Handler } from "$fresh/server.ts";

export const handler: Handler = (_req, _ctx) => {
  const svg = `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#1f2937"/>
  <circle cx="200" cy="200" r="60" fill="#3b82f6" opacity="0.3"/>
  <circle cx="200" cy="200" r="40" fill="#3b82f6" opacity="0.5"/>
  <text x="200" y="170" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="32" font-weight="bold">🛡️</text>
  <text x="200" y="220" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="20" font-weight="bold">My Score</text>
  <text x="200" y="250" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="16">Loading...</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}; 