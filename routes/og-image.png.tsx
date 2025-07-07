import { Handler } from "$fresh/server.ts";

export const handler: Handler = (_req, _ctx) => {
  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#1f2937"/>
  <circle cx="600" cy="315" r="80" fill="#3b82f6" opacity="0.2"/>
  <circle cx="600" cy="315" r="60" fill="#3b82f6" opacity="0.3"/>
  <circle cx="600" cy="315" r="40" fill="#3b82f6" opacity="0.5"/>
  <text x="600" y="280" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="48" font-weight="bold">🛡️</text>
  <text x="600" y="340" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="32" font-weight="bold">My Ethos Score</text>
  <text x="600" y="380" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="24">Get your personal credibility rating</text>
  <text x="600" y="420" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="18">Powered by Ethos Network</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}; 