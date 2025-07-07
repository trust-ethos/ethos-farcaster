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



// Update the UI with credibility data
function updateCredibilityUI(data) {
  const contentDiv = document.getElementById('miniapp-content');
  const styling = getLevelStyling(data.score);
  
  // Handle users not connected to Ethos (score 0 or 1200 are default values)
  if (data.score === 0 || data.score === 1200) {
    contentDiv.innerHTML = `
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Connect to Ethos Network</h2>
          <span class="text-sm text-gray-500">FID: ${data.fid}</span>
        </div>
        
        <div class="text-center py-8">
          <div class="text-6xl mb-4">🔗</div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">No Ethos profile found!</h3>
          <p class="text-gray-600 mb-8">
            If you have an Ethos profile, you can connect it to Farcaster below. Otherwise you'll need to secure an invite from an existing user to get started!
          </p>
          
          <div class="flex gap-3 justify-center mb-4" style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px;">
            <a href="https://app.ethos.network/profile/settings" target="_blank" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block text-decoration-none" style="background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600;">Connect Farcaster</a>
            <a href="https://app.ethos.network" target="_blank" class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block text-decoration-none" style="background-color: #6b7280; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600;">Open Ethos</a>
          </div>
        </div>
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
        

        
        <div class="text-center py-8">
          <div class="text-6xl font-bold ${styling.color} mb-4">${data.score}</div>
          <div class="text-xl text-gray-600 mb-2">Your Ethos Score</div>
          <div class="text-sm text-gray-500">
            Level: <span class="font-semibold capitalize ${styling.color}">${data.level}</span>
          </div>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-4 mb-4">
          <p class="text-xs text-gray-500 text-center">
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
  }
  
  // Re-setup event listeners for new elements
  setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
  const searchBtn = document.getElementById('search-user-btn');
  const learnMoreBtn = document.getElementById('learn-more-btn');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearchUsers);
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