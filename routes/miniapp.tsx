import { Head } from "$fresh/runtime.ts";

export default function MiniApp() {
  return (
    <>
      <Head>
        <title>Ethos Credibility Scores</title>
        <meta name="description" content="View credibility scores for Farcaster users" />
      </Head>
      <div class="min-h-screen bg-gray-50">
        <div class="container mx-auto px-4 py-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              Ethos Credibility Scores
            </h1>
            <p class="text-gray-600">
              Understanding trust in the Farcaster ecosystem
            </p>
          </div>
          
          <div id="miniapp-content" class="space-y-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-ethos-primary mx-auto mb-4"></div>
                <p class="text-gray-600">Loading Mini App...</p>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  id="view-profile-btn"
                  class="bg-ethos-primary hover:bg-ethos-secondary text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  View Your Profile
                </button>
                <button 
                  id="search-user-btn"
                  class="bg-ethos-accent hover:bg-ethos-accent/80 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Search Users
                </button>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-semibold mb-4">Credibility Overview</h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-ethos-success">--</div>
                  <div class="text-sm text-gray-600">Your Score</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-ethos-primary">--</div>
                  <div class="text-sm text-gray-600">Attestations</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-ethos-warning">--</div>
                  <div class="text-sm text-gray-600">Network</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-ethos-accent">--</div>
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