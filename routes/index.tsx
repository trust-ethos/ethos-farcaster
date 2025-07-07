import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ethos Farcaster Mini App</title>
        <meta name="description" content="Credibility scores for Farcaster users" />
      </Head>
      <div class="min-h-screen bg-gradient-to-br from-farcaster-purple to-ethos-primary">
        <div class="container mx-auto px-4 py-8">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-white mb-4">
              Ethos × Farcaster
            </h1>
            <p class="text-xl text-white/80 mb-8">
              Bringing credibility scores to the Farcaster ecosystem
            </p>
            
            <div class="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
              <h2 class="text-2xl font-semibold mb-4 text-gray-800">
                Features
              </h2>
              <ul class="space-y-3 text-left">
                <li class="flex items-center">
                  <span class="text-ethos-success mr-2">✓</span>
                  View credibility scores for Farcaster users
                </li>
                <li class="flex items-center">
                  <span class="text-ethos-success mr-2">✓</span>
                  Attestation integration with Farcaster profiles
                </li>
                <li class="flex items-center">
                  <span class="text-ethos-success mr-2">✓</span>
                  Peer-to-peer feedback system
                </li>
                <li class="flex items-center">
                  <span class="text-ethos-success mr-2">✓</span>
                  Trust network visualization
                </li>
              </ul>
              
              <div class="mt-8">
                <a 
                  href="/miniapp"
                  class="bg-ethos-primary hover:bg-ethos-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Launch Mini App
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 