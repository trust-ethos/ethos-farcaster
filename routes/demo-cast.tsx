import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";

export default function DemoCast({ url }: PageProps) {
  // Ensure we always use HTTPS for Mini App metadata
  const baseUrl = url.origin.replace('http://', 'https://');
  
  return (
    <>
      <Head>
        <title>Ethos Credibility Scores - Demo</title>
        <meta name="description" content="Check credibility scores for Farcaster users" />
        
        {/* This is what makes it a Mini App! */}
        <meta property="fc:miniapp" content={JSON.stringify({
          version: "next",
          imageUrl: `${baseUrl}/og-image.png`,
          button: {
            title: "Check Credibility",
            action: {
              type: "launch_frame",
              name: "Ethos Credibility",
              url: `${baseUrl}/miniapp`,
              splashImageUrl: `${baseUrl}/splash.png`
            }
          }
        })} />
      </Head>
      
      <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4">
          <div class="max-w-2xl mx-auto">
            <h1 class="text-3xl font-bold text-center mb-8">
              🎯 Mini App Demo: How It Works
            </h1>
            
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 class="text-xl font-semibold mb-4">What You Just Built</h2>
              <p class="text-gray-700 mb-4">
                You built a <strong>web application</strong> that integrates with Farcaster through:
              </p>
              <ul class="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Mini App Embeds</strong>: Rich previews in casts</li>
                <li><strong>Farcaster SDK</strong>: Authentication and user data</li>
                <li><strong>Quick Auth</strong>: Seamless sign-in</li>
                <li><strong>API Integration</strong>: Connect to Ethos for credibility data</li>
              </ul>
            </div>
            
            <div class="bg-blue-50 rounded-lg p-6 mb-6">
              <h2 class="text-xl font-semibold mb-4">How Users Will Use It</h2>
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</div>
                  <div>
                    <h3 class="font-semibold">Someone shares your Mini App URL</h3>
                    <p class="text-gray-600">They post a cast with your app's URL</p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</div>
                  <div>
                    <h3 class="font-semibold">Farcaster shows rich embed</h3>
                    <p class="text-gray-600">The cast displays your Mini App as a card with a button</p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</div>
                  <div>
                    <h3 class="font-semibold">User clicks "Check Credibility"</h3>
                    <p class="text-gray-600">Your app opens within the Farcaster client</p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">4</div>
                  <div>
                    <h3 class="font-semibold">App authenticates & shows credibility</h3>
                    <p class="text-gray-600">Your app uses the SDK to get user data and show Ethos scores</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-green-50 rounded-lg p-6 mb-6">
              <h2 class="text-xl font-semibold mb-4">🎉 Your Mini App is Ready!</h2>
              <p class="text-gray-700 mb-4">
                The web app we built is production-ready. You can:
              </p>
              <ul class="list-disc list-inside space-y-2 text-gray-700">
                <li>Deploy it to Deno Deploy or any web host</li>
                <li>Share the URL in Farcaster casts</li>
                <li>Users will see it as a Mini App embed</li>
                <li>It will authenticate users and show credibility scores</li>
              </ul>
            </div>
            
            <div class="bg-yellow-50 rounded-lg p-6">
              <h2 class="text-xl font-semibold mb-4">💡 Example Cast</h2>
              <p class="text-gray-700 mb-4">
                Here's what someone might post to share your Mini App:
              </p>
              <div class="bg-white rounded-lg p-4 border">
                <p class="text-gray-800 mb-2">
                  "Check out this new way to see credibility scores for Farcaster users! 
                  Built with @ethos data 🔥"
                </p>
                <p class="text-blue-600 underline">
                  {baseUrl}/demo-cast
                </p>
                <div class="mt-4 bg-gray-100 rounded-lg p-3">
                  <p class="text-sm text-gray-600">
                    📱 <strong>Mini App Preview:</strong> "Ethos Credibility Scores"
                  </p>
                  <button class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
                    Check Credibility
                  </button>
                </div>
              </div>
            </div>
            
            <div class="text-center mt-8">
              <a 
                href="/miniapp"
                class="bg-ethos-primary hover:bg-ethos-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Try the Mini App
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 