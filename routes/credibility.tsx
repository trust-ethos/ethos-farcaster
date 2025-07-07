import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";

export default function CredibilityMiniApp({ url }: PageProps) {
  // Ensure we always use HTTPS for Mini App metadata
  const baseUrl = url.origin.replace('http://', 'https://');
  
  return (
    <>
      <Head>
        <title>My Ethos Score</title>
        <meta name="description" content="Check your personal Ethos credibility score" />
        <meta property="fc:miniapp" content={JSON.stringify({
          version: "next",
          imageUrl: `${baseUrl}/og-image.png`,
          button: {
            title: "Get My Ethos Score",
            action: {
              type: "launch_frame",
              name: "My Ethos Score",
              url: `${baseUrl}/credibility`,
              splashImageUrl: `${baseUrl}/splash.png`
            }
          }
        })} />
      </Head>
      <div class="min-h-screen bg-gray-50">
        <div class="container mx-auto px-4 py-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              🛡️ My Ethos Score
            </h1>
            <p class="text-gray-600">
              Your personal credibility rating on Farcaster
            </p>
          </div>
          
          <div id="miniapp-content" class="space-y-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p class="text-gray-600">Loading Mini App...</p>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p class="text-gray-600">Loading your Ethos score...</p>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-semibold mb-4">Credibility Overview</h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600">--</div>
                  <div class="text-sm text-gray-600">Your Score</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-600">--</div>
                  <div class="text-sm text-gray-600">Attestations</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-purple-600">--</div>
                  <div class="text-sm text-gray-600">Network</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-orange-600">--</div>
                  <div class="text-sm text-gray-600">Rank</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <script type="module" src="/miniapp-client.js"></script>
    </>
  );
} 