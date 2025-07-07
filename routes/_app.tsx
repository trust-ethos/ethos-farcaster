import { type PageProps } from "$fresh/server.ts";

export default function App({ Component, url }: PageProps) {
  // Ensure we always use HTTPS for Mini App metadata
  const baseUrl = url.origin.replace('http://', 'https://');
  const isCredibilityRoute = url.pathname === '/credibility';
  
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ethos Farcaster Mini App</title>
        <link rel="preconnect" href="https://auth.farcaster.xyz" />
        {!isCredibilityRoute && (
          <meta property="fc:miniapp" content={JSON.stringify({
            version: "next",
            imageUrl: `${baseUrl}/og-image.png`,
            button: {
              title: "Ethos Scores",
              action: {
                type: "launch_frame",
                name: "Ethos Credibility",
                url: `${baseUrl}/miniapp`,
                splashImageUrl: `${baseUrl}/splash.png`
              }
            }
          })} />
        )}
      </head>
      <body>
        <div id="app">
          <Component />
        </div>
        <script type="module" src="/sdk-init.js"></script>
      </body>
    </html>
  );
} 