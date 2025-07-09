import { PageProps } from "$fresh/server.ts";

export default function TestPage(props: PageProps) {
  return (
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-md mx-auto p-6">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h1 class="text-2xl font-bold mb-6 text-center">
            🛡️ Ethos Credibility Test
          </h1>
          
          <div class="mb-6">
            <p class="text-gray-600 mb-4">
              Test the Mini App UI without Farcaster authentication.
            </p>
            
            <div class="space-y-4">
              <button 
                id="test-revered-btn"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Test FID 1112413 (Revered User)
              </button>
              
              <button 
                id="test-no-profile-btn"
                class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
              >
                Test FID 123456789 (No Profile)
              </button>
              
              <div class="flex space-x-2">
                <input 
                  type="number" 
                  id="custom-fid" 
                  placeholder="Enter FID" 
                  class="flex-1 px-3 py-2 border border-gray-300 rounded"
                />
                <button 
                  id="test-custom-btn"
                  class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Test
                </button>
              </div>
            </div>
          </div>
          
          <div id="test-results" class="hidden">
            <div id="test-content"></div>
          </div>
        </div>
      </div>
      
      <script src="/test-client.js"></script>
    </div>
  );
} 