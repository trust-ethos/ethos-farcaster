import { PageProps } from "$fresh/server.ts";

export default function CastTestPage(props: PageProps) {
  // Ensure we always use HTTPS for Mini App metadata and URLs
  const baseUrl = props.url.origin.replace('http://', 'https://');
  
  return (
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-2xl mx-auto p-6">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h1 class="text-2xl font-bold mb-6 text-center">
            🛡️ Share "Get My Ethos Score" on Farcaster
          </h1>
          
          <div class="space-y-6">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h2 class="font-semibold mb-3 text-blue-900">🎯 Your Mini App URL</h2>
              <code class="bg-white p-2 rounded text-sm block break-all">
                {baseUrl}/credibility
              </code>
              <button 
                onClick={() => navigator.clipboard.writeText(`${baseUrl}/credibility`)}
                class="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Copy URL
              </button>
            </div>

            <div class="bg-green-50 p-4 rounded-lg">
              <h2 class="font-semibold mb-3 text-green-900">📱 Example Cast Text</h2>
              <div class="bg-white p-3 rounded border-l-4 border-green-500">
                <p class="whitespace-pre-line text-sm">
{`🛡️ What's my Ethos credibility score? 

Check your trustworthiness rating in the Farcaster ecosystem! Each person sees their own personalized score.

${baseUrl}/credibility`}
                </p>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(`🛡️ What's my Ethos credibility score? 

Check your trustworthiness rating in the Farcaster ecosystem! Each person sees their own personalized score.

${baseUrl}/credibility`)}
                class="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Copy Cast Text
              </button>
            </div>

            <div class="bg-purple-50 p-4 rounded-lg">
              <h2 class="font-semibold mb-3 text-purple-900">🔍 Testing Steps</h2>
              <ol class="list-decimal list-inside space-y-2 text-sm">
                <li>Copy the cast text above</li>
                <li>Open Warpcast, Supercast, or any Farcaster client</li>
                <li>Create a new cast and paste the text</li>
                <li>Post the cast</li>
                <li>Click the "Open Mini App" button in your cast</li>
                <li>Test the authentication and Mini App functionality</li>
              </ol>
            </div>

            <div class="bg-yellow-50 p-4 rounded-lg">
              <h2 class="font-semibold mb-3 text-yellow-900">🔗 Alternative: Demo Cast</h2>
              <p class="text-sm mb-3">
                You can also share this URL which includes a "Try Mini App" button:
              </p>
              <code class="bg-white p-2 rounded text-sm block break-all">
                {baseUrl}/demo-cast
              </code>
              <button 
                onClick={() => navigator.clipboard.writeText(`${baseUrl}/demo-cast`)}
                class="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
              >
                Copy Demo URL
              </button>
            </div>

            <div class="bg-red-50 p-4 rounded-lg">
              <h2 class="font-semibold mb-3 text-red-900">🚨 Important Notes</h2>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>Make sure your ngrok tunnel is running</li>
                <li>Test the URL in a browser first</li>
                <li>The Mini App will only work in Farcaster clients</li>
                <li>Authentication requires a real Farcaster account</li>
              </ul>
            </div>

            <div class="flex space-x-4">
              <a 
                href="/test" 
                class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center"
              >
                Test UI (No Auth)
              </a>
              <a 
                href="/miniapp" 
                class="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded text-center"
              >
                Test Mini App
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 