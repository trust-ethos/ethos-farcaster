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
  
  // Handle users with score 0 or 1200 (default values when no profile exists)
  if (data.score === 0 || data.score === 1200) {
    contentDiv.innerHTML = `
              <div class="text-center py-8">
          <div class="text-6xl mb-4">🛡️</div>
          <div class="text-xl font-semibold mb-2">No Ethos Profile Found</div>
          <div class="text-gray-600 mb-4">FID ${data.fid} doesn't have an Ethos profile yet.</div>
          <div class="text-sm text-gray-500">This user needs to create an Ethos profile to get a real credibility score.</div>
        </div>
    `;
    return;
  }
  
  contentDiv.innerHTML = `
    <div class="space-y-6">
      <div class="text-center">
        <h2 class="text-xl font-bold mb-2">Ethos Credibility Score</h2>
        <div class="text-gray-600">FID ${data.fid}</div>
      </div>
      
      <div class="text-center py-8">
        <div class="text-6xl font-bold ${styling.color} mb-4">${data.score}</div>
        <div class="text-xl text-gray-600 mb-2">Ethos Score</div>
        <div class="text-sm text-gray-500">
          Level: <span class="font-semibold capitalize ${styling.color}">${data.level}</span>
        </div>
      </div>
      
      <div class="bg-gray-50 rounded-lg p-4">
        <p class="text-xs text-gray-500 text-center">
          Powered by Ethos Network
        </p>
      </div>
    </div>
  `;
}

// Make functions available globally
window.testUser = testUser;
window.testCustomFid = testCustomFid; 