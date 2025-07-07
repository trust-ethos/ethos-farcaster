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
function updateTestCredibilityUI(data) {
  const contentDiv = document.getElementById('test-content');
  const styling = getLevelStyling(data.score);
  
  // Handle unknown users
  if (data.score === 0 && data.level === 'untrusted') {
    contentDiv.innerHTML = `
      <div class="text-center py-8">
        <div class="text-6xl mb-4">🤷‍♂️</div>
        <div class="text-xl font-semibold mb-2">User Not Found in Ethos</div>
        <div class="text-gray-600 mb-4">FID ${data.fid} doesn't have an Ethos credibility score yet.</div>
        <div class="text-sm text-gray-500">This user may be new to the network or hasn't built reputation yet.</div>
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
      
      <div class="text-xs text-gray-500 text-center">
        Last updated: ${new Date(data.lastUpdated).toLocaleString()}
      </div>
    </div>
  `;
}

// Make functions available globally
window.testUser = testUser;
window.testCustomFid = testCustomFid; 