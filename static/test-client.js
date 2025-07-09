// Test client for Mini App UI without Farcaster authentication

// Test a specific user FID
async function testUser(fid) {
  try {
    console.log(`Testing FID: ${fid}`);
    
    // Show loading state
    const resultsDiv = document.getElementById('test-results');
    const contentDiv = document.getElementById('test-content');
    
    resultsDiv.classList.remove('hidden');
    contentDiv.innerHTML = `
      <div class="flex items-center justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span class="ml-2">Loading FID ${fid}...</span>
      </div>
    `;
    
    // Fetch credibility data
    const response = await fetch(`/api/credibility/${fid}`);
    const data = await response.json();
    
    console.log('Credibility data:', data);
    
    // Update UI with credibility data
    updateTestCredibilityUI(data);
    
  } catch (error) {
    console.error('Error testing user:', error);
    const contentDiv = document.getElementById('test-content');
    contentDiv.innerHTML = `
      <div class="text-center py-8">
        <div class="text-red-600 font-semibold">Error loading data</div>
        <div class="text-gray-600 text-sm mt-2">${error.message}</div>
      </div>
    `;
  }
}

// Test custom FID from input
function testCustomFid() {
  const input = document.getElementById('custom-fid');
  const fid = parseInt(input.value);
  
  if (isNaN(fid) || fid <= 0) {
    alert('Please enter a valid FID number');
    return;
  }
  
  testUser(fid);
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
function updateTestCredibilityUI(data) {
  const contentDiv = document.getElementById('test-content');
  const styling = getLevelStyling(data.score);
  
  // Handle users with no profile
  if (!data.hasProfile) {
    contentDiv.innerHTML = `
      <div class="text-center py-8">
        <div class="text-6xl mb-4">🔗</div>
        <div class="text-xl font-semibold mb-2">No Ethos Score Yet</div>
        <div class="text-gray-600 mb-6">FID ${data.fid} doesn't have an Ethos profile yet.</div>
        
        <div class="flex gap-3 justify-center mb-4" style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px;">
          <a href="https://app.ethos.network/profile/settings" target="_blank" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block text-decoration-none" style="background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600;">Connect Farcaster</a>
          <a href="https://app.ethos.network" target="_blank" class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block text-decoration-none" style="background-color: #6b7280; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600;">Open Ethos</a>
        </div>
      </div>
    `;
    return;
  }
  
  const user = data.user;
  const totalReviews = user.stats.review.received.positive + user.stats.review.received.neutral + user.stats.review.received.negative;
  const totalVouchesReceived = user.stats.vouch.received.count;
  const totalVouchesGiven = user.stats.vouch.given.count;
  
  contentDiv.innerHTML = `
    <div class="space-y-6">
      <div class="text-center">
        <h2 class="text-xl font-bold mb-2">Ethos Profile</h2>
        <div class="text-gray-600">FID ${data.fid}</div>
      </div>
      
      <!-- Profile Header -->
      <div class="flex items-center justify-center mb-6">
        <div class="text-center">
          ${user.avatarUrl ? `<img src="${user.avatarUrl}" alt="Profile" class="w-16 h-16 rounded-full mx-auto mb-3 object-cover">` : '<div class="w-16 h-16 rounded-full bg-gray-300 mx-auto mb-3 flex items-center justify-center text-gray-600 text-xl font-bold">👤</div>'}
          <h3 class="text-lg font-semibold text-gray-900">${user.displayName || 'Anonymous'}</h3>
          <p class="text-sm text-gray-600">@${user.username || 'unknown'}</p>
          <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full ${styling.bg} ${styling.color} capitalize mt-2">
            ${user.status.toLowerCase()}
          </span>
        </div>
      </div>
      
      ${user.description ? `
      <div class="mb-6">
        <p class="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg italic text-center">
          "${user.description}"
        </p>
      </div>
      ` : ''}
      
      <!-- Score Display -->
      <div class="text-center py-6 bg-gray-50 rounded-lg">
        <div class="text-5xl font-bold ${styling.color} mb-2">${data.score}</div>
        <div class="text-lg text-gray-600 mb-1">Ethos Score</div>
        <div class="text-sm text-gray-500">
          Level: <span class="font-semibold capitalize ${styling.color}">${data.level}</span>
        </div>
      </div>
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- XP Stats -->
        <div class="bg-white border rounded-lg p-4">
          <h3 class="text-md font-semibold mb-3 flex items-center">
            <span class="text-yellow-500 mr-2">⚡</span>
            Experience Points
          </h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Total XP:</span>
              <span class="font-semibold text-yellow-600">${user.xpTotal.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Streak:</span>
              <span class="font-semibold text-orange-600">${user.xpStreakDays} day${user.xpStreakDays !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
        
        <!-- Review Stats -->
        <div class="bg-white border rounded-lg p-4">
          <h3 class="text-md font-semibold mb-3 flex items-center">
            <span class="text-blue-500 mr-2">📝</span>
            Reviews Received
          </h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Positive:</span>
              <span class="font-semibold text-green-600">${user.stats.review.received.positive}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Neutral:</span>
              <span class="font-semibold text-gray-600">${user.stats.review.received.neutral}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Negative:</span>
              <span class="font-semibold text-red-600">${user.stats.review.received.negative}</span>
            </div>
            <div class="border-t pt-2">
              <div class="flex justify-between font-semibold">
                <span class="text-gray-700">Total:</span>
                <span class="text-gray-900">${totalReviews}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Vouch Stats -->
        <div class="bg-white border rounded-lg p-4">
          <h3 class="text-md font-semibold mb-3 flex items-center">
            <span class="text-purple-500 mr-2">🤝</span>
            Vouches
          </h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Received:</span>
              <span class="font-semibold text-purple-600">${totalVouchesReceived}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Given:</span>
              <span class="font-semibold text-indigo-600">${totalVouchesGiven}</span>
            </div>
          </div>
        </div>
        
        <!-- Profile ID -->
        <div class="bg-white border rounded-lg p-4">
          <h3 class="text-md font-semibold mb-3 flex items-center">
            <span class="text-gray-500 mr-2">🔗</span>
            Profile Info
          </h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Profile ID:</span>
              <span class="font-semibold text-gray-900">${user.profileId}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">User ID:</span>
              <span class="font-semibold text-gray-900">${user.id}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Action Links -->
      <div class="text-center">
        <a href="https://app.ethos.network/profile/${user.username || user.id}" target="_blank" 
           class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
          View Full Profile on Ethos
        </a>
      </div>
      
      <div class="bg-gray-50 rounded-lg p-4">
        <p class="text-xs text-gray-500 text-center">
          Powered by Ethos Network
        </p>
      </div>
    </div>
  `;
}

// Set up event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Test revered user button
  const testReveredBtn = document.getElementById('test-revered-btn');
  if (testReveredBtn) {
    testReveredBtn.addEventListener('click', () => testUser(1112413));
  }
  
  // Test no profile button  
  const testNoProfileBtn = document.getElementById('test-no-profile-btn');
  if (testNoProfileBtn) {
    testNoProfileBtn.addEventListener('click', () => testUser(123456789));
  }
  
  // Test custom FID button
  const testCustomBtn = document.getElementById('test-custom-btn');
  if (testCustomBtn) {
    testCustomBtn.addEventListener('click', testCustomFid);
  }
});

// Make functions available globally as backup
window.testUser = testUser;
window.testCustomFid = testCustomFid; 