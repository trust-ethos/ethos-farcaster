// Mini App Client - Handles Farcaster SDK interactions
import { sdk } from "https://esm.sh/@farcaster/miniapp-sdk@0.1.0";

let currentUser = null;

// Initialize the app
async function initializeApp() {
  try {
    console.log("Initializing Mini App...");
    
    // Check if we're running in a Farcaster client
    const isInFarcasterClient = window.parent !== window;
    console.log("Running in Farcaster client:", isInFarcasterClient);
    
    if (isInFarcasterClient) {
      // Get authenticated user
      const token = await sdk.quickAuth.getToken();
      console.log("Auth token received:", !!token);
      
      if (token) {
        // Parse JWT to get user FID
        const payload = JSON.parse(atob(token.token.split('.')[1]));
        currentUser = { fid: payload.sub };
        console.log("Authenticated user FID:", currentUser.fid);
        
        // Load user's credibility data
        await loadUserCredibility(currentUser.fid);
      } else {
        console.log("No auth token received");
        showAuthError();
      }
      
      // Signal that the app is ready
      await sdk.actions.ready();
    } else {
      // Running outside of Farcaster client - show instructions
      showNotInFarcasterMessage();
    }
    
    // Set up event listeners
    setupEventListeners();
    
    console.log("Mini App initialized successfully");
    
  } catch (error) {
    console.error("Failed to initialize Mini App:", error);
    showAuthError();
  }
}

// Load user credibility data
async function loadUserCredibility(fid) {
  try {
    const response = await fetch(`/api/credibility/${fid}`);
    const credibilityData = await response.json();
    
    // Update the UI with credibility data
    updateCredibilityUI(credibilityData);
    
  } catch (error) {
    console.error("Failed to load credibility data:", error);
  }
}

// Get level-based styling based on score
function getLevelStyling(score) {
  if (score >= 2400) return { color: 'text-purple-700', bg: 'bg-purple-100', label: 'revered' };
  if (score >= 2000) return { color: 'text-green-700', bg: 'bg-green-100', label: 'exemplary' };
  if (score >= 1600) return { color: 'text-blue-700', bg: 'bg-blue-100', label: 'reputable' };
  if (score >= 1200) return { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'neutral' };
  if (score >= 800) return { color: 'text-orange-600', bg: 'bg-orange-100', label: 'questionable' };
  if (score > 0) return { color: 'text-red-600', bg: 'bg-red-100', label: 'untrusted' };
  return { color: 'text-gray-600', bg: 'bg-gray-100', label: 'unknown' };
}

// Get score range for display
function getScoreRange(score) {
  if (score >= 2400) return '2400-2800';
  if (score >= 2000) return '2000-2399';
  if (score >= 1600) return '1600-1999';
  if (score >= 1200) return '1200-1599';
  if (score >= 800) return '800-1199';
  if (score > 0) return '0-799';
  return 'N/A';
}

// Update the UI with credibility data
function updateCredibilityUI(data) {
  const contentDiv = document.getElementById('miniapp-content');
  const styling = getLevelStyling(data.score);
  
  // Handle users not connected to Ethos (score exactly 0)
  if (data.score === 0 && data.level === 'untrusted') {
    contentDiv.innerHTML = `
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Connect to Ethos Network</h2>
          <span class="text-sm text-gray-500">FID: ${data.fid}</span>
        </div>
        
        <div class="text-center py-8">
          <div class="text-6xl mb-4">🔗</div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">No Ethos Score Yet</h3>
          <p class="text-gray-600 mb-4">
            Your Farcaster account isn't connected to Ethos yet. Connect it to start building your credibility score!
          </p>
          <p class="text-sm text-gray-500 mb-6">
            Ethos scores are based on peer-to-peer attestations and community feedback.
          </p>
          
          <a 
            href="https://app.ethos.network/profile/settings" 
            target="_blank"
            class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-4"
          >
            🛡️ Connect Farcaster to Ethos
          </a>
          
          <p class="text-xs text-gray-500">
            This will open Ethos Network in a new tab where you can link your accounts.
          </p>
        </div>
      </div>
      
      <div class="bg-gray-50 rounded-lg p-4 mb-4">
        <h3 class="font-semibold mb-2">How to get an Ethos score:</h3>
        <ol class="text-sm text-gray-600 space-y-1">
          <li>1. Connect your Farcaster account to Ethos</li>
          <li>2. Engage authentically in the community</li>
          <li>3. Receive attestations from other users</li>
          <li>4. Build your reputation over time</li>
        </ol>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            id="search-user-btn"
            class="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Search Other Users
          </button>
          <a 
            href="https://ethos.network" 
            target="_blank"
            class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
          >
            Learn About Ethos
          </a>
        </div>
      </div>
    `;
  } else {
    contentDiv.innerHTML = `
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Credibility Profile</h2>
          <span class="text-sm text-gray-500">FID: ${data.fid}</span>
        </div>
        
        <div class="mb-6">
          <div class="flex items-center space-x-4 mb-4">
            <div class="${styling.bg} ${styling.color} px-4 py-2 rounded-full">
              <span class="font-semibold text-lg">${data.score}</span>
            </div>
            <div>
              <div class="font-semibold capitalize ${styling.color}">${data.level}</div>
              <div class="text-sm text-gray-500">Ethos Level</div>
            </div>
            <div class="text-sm text-gray-500">
              <div>Range: ${getScoreRange(data.score)}</div>
              <div>Category: ${styling.label}</div>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="text-center">
            <div class="text-3xl font-bold ${styling.color}">${data.score}</div>
            <div class="text-sm text-gray-600">Ethos Score</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">${data.attestations}</div>
            <div class="text-sm text-gray-600">Attestations</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600">${Math.round(data.networkScore)}</div>
            <div class="text-sm text-gray-600">Network Score</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600">#${data.rank}</div>
            <div class="text-sm text-gray-600">Rank</div>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="font-semibold mb-3">Score Breakdown</h3>
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span>Trustworthiness</span>
              <div class="flex items-center">
                <div class="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div class="bg-green-500 h-2 rounded-full" style="width: ${Math.min(100, (data.breakdown.trustworthiness / 2800) * 100)}%"></div>
                </div>
                <span class="text-sm">${Math.round(data.breakdown.trustworthiness)}</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span>Expertise</span>
              <div class="flex items-center">
                <div class="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div class="bg-blue-500 h-2 rounded-full" style="width: ${Math.min(100, (data.breakdown.expertise / 2800) * 100)}%"></div>
                </div>
                <span class="text-sm">${Math.round(data.breakdown.expertise)}</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span>Reliability</span>
              <div class="flex items-center">
                <div class="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div class="bg-purple-500 h-2 rounded-full" style="width: ${Math.min(100, (data.breakdown.reliability / 2800) * 100)}%"></div>
                </div>
                <span class="text-sm">${Math.round(data.breakdown.reliability)}</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span>Engagement</span>
              <div class="flex items-center">
                <div class="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div class="bg-orange-500 h-2 rounded-full" style="width: ${Math.min(100, (data.breakdown.engagement / 2800) * 100)}%"></div>
                </div>
                <span class="text-sm">${Math.round(data.breakdown.engagement)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-4 mb-4">
          <p class="text-sm text-gray-600">
            Last updated: ${new Date(data.lastUpdated).toLocaleDateString()}
          </p>
          <p class="text-xs text-gray-500 mt-1">
            Powered by Ethos Network
          </p>
        </div>
        
        ${data.score < 800 && data.score > 0 ? `
        <div class="bg-blue-50 rounded-lg p-4 mb-4">
          <h3 class="font-semibold text-blue-800 mb-2">💡 Improve Your Score</h3>
          <p class="text-sm text-blue-600 mb-2">Your score is in the "untrusted" range. Here's how to improve:</p>
          <ul class="text-xs text-blue-600 space-y-1">
            <li>• Connect your social accounts on Ethos</li>
            <li>• Engage authentically in the community</li>
            <li>• Ask trusted friends to attest to your character</li>
            <li>• Be consistent and helpful in your interactions</li>
          </ul>
          <a 
            href="https://app.ethos.network/profile/settings" 
            target="_blank"
            class="inline-block mt-2 text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Manage Ethos Profile →
          </a>
        </div>
        ` : ''}
        
        ${data.score >= 2400 ? `
        <div class="bg-purple-50 rounded-lg p-4 mb-4">
          <h3 class="font-semibold text-purple-800 mb-2">🏆 Exceptional Reputation!</h3>
          <p class="text-sm text-purple-600">
            You're in the top tier of Ethos users. Your credibility is revered in the community!
          </p>
        </div>
        ` : ''}
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            id="search-user-btn"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Search Other Users
          </button>
          <button 
            id="view-attestations-btn"
            class="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    `;
  }
  
  // Re-setup event listeners for new elements
  setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
  const searchBtn = document.getElementById('search-user-btn');
  const viewAttestationsBtn = document.getElementById('view-attestations-btn');
  const learnMoreBtn = document.getElementById('learn-more-btn');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearchUsers);
  }
  
  if (viewAttestationsBtn) {
    viewAttestationsBtn.addEventListener('click', handleViewAttestations);
  }

  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', handleLearnMore);
  }
}

// Handle search users
async function handleSearchUsers() {
  const fid = prompt('Enter a Farcaster ID (FID) to view their credibility:');
  if (fid && !isNaN(parseInt(fid))) {
    await loadUserCredibility(parseInt(fid));
  }
}

// Handle view attestations
async function handleViewAttestations() {
  alert('Detailed view coming soon! This will show comprehensive Ethos data and attestation history.');
}

// Handle learn more
async function handleLearnMore() {
  window.open('https://ethos.network', '_blank');
}

// Show authentication error
function showAuthError() {
  document.getElementById('miniapp-content').innerHTML = `
    <div class="bg-red-50 border border-red-200 rounded-lg p-6">
      <div class="text-center">
        <h2 class="text-lg font-semibold text-red-800 mb-2">Authentication Error</h2>
        <p class="text-red-600 mb-4">Unable to authenticate with Farcaster. Please try again.</p>
        <button 
          onclick="window.location.reload()"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    </div>
  `;
}

// Show message when not in Farcaster client
function showNotInFarcasterMessage() {
  document.getElementById('miniapp-content').innerHTML = `
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div class="text-center">
        <h2 class="text-lg font-semibold text-blue-800 mb-2">🛡️ Get My Ethos Score</h2>
        <p class="text-blue-600 mb-4">
          This Mini App shows YOUR personal Ethos credibility score. 
          To see your score, open it from within a Farcaster client.
        </p>
        <div class="bg-white rounded-lg p-4 mb-4">
          <h3 class="font-semibold mb-2">How it works:</h3>
          <ol class="text-left text-sm space-y-1">
            <li>1. Share this Mini App URL in a Farcaster cast</li>
            <li>2. When people click "Get My Ethos Score", they see their own score</li>
            <li>3. Each person gets their personalized credibility rating</li>
          </ol>
        </div>
        <div class="space-y-2">
          <button 
            onclick="handleSearchUsers()"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search Any User
          </button>
          <a 
            href="/test"
            class="block w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-center"
          >
            Try Demo Interface
          </a>
        </div>
      </div>
    </div>
  `;
}

// Make functions globally accessible
window.handleSearchUsers = handleSearchUsers;

// Initialize when the page loads
window.addEventListener('DOMContentLoaded', initializeApp); 