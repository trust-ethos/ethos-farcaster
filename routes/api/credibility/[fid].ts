import { type Handlers } from "$fresh/server.ts";

export interface EthosScoreResponse {
  score: number;
  level: string;
}

export interface CredibilityScore {
  fid: number;
  score: number;
  level: string;
  ethosData: EthosScoreResponse;
}

async function getEthosScore(fid: number): Promise<EthosScoreResponse | null> {
  try {
    const userkey = `service:farcaster:${fid}`;
    const url = `https://api.ethos.network/api/v2/score/userkey?userkey=${encodeURIComponent(userkey)}`;
    
    console.log(`Fetching Ethos score for FID ${fid} with userkey: ${userkey}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Ethos-Farcaster-MiniApp/1.0',
      },
    });

    if (!response.ok) {
      console.log(`Ethos API response: ${response.status} ${response.statusText}`);
      if (response.status === 404) {
        return null; // User not found in Ethos
      }
      throw new Error(`Ethos API error: ${response.status}`);
    }

    const data: EthosScoreResponse = await response.json();
    console.log(`Ethos score for FID ${fid}:`, data);
    return data;
  } catch (error) {
    console.error(`Failed to fetch Ethos score for FID ${fid}:`, error);
    return null;
  }
}

// Get Ethos level from score
function getEthosLevel(score: number): string {
  if (score >= 2400) return "revered";
  if (score >= 2000) return "exemplary";
  if (score >= 1600) return "reputable";
  if (score >= 1200) return "neutral";
  if (score >= 800) return "questionable";
  return "untrusted";
}

// Get level color for UI
function getLevelColor(score: number): string {
  if (score >= 2400) return "purple";
  if (score >= 2000) return "green";
  if (score >= 1600) return "blue";
  if (score >= 1200) return "yellow";
  if (score >= 800) return "orange";
  return "red";
}



export const handler: Handlers = {
  async GET(req, ctx) {
    const fid = parseInt(ctx.params.fid);
    
    if (isNaN(fid)) {
      return new Response(
        JSON.stringify({ error: "Invalid FID" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      // Get real Ethos score
      const ethosData = await getEthosScore(fid);
      
      // If no data or default values (0 or 1200), treat as no profile
      if (!ethosData || ethosData.score === 0 || ethosData.score === 1200) {
        // User not found in Ethos - return default/unknown state
        const defaultCredibility: CredibilityScore = {
          fid,
          score: 0,
          level: "untrusted",
          ethosData: { score: 0, level: "untrusted" },
        };

        return new Response(
          JSON.stringify(defaultCredibility),
          { 
            status: 200, 
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            } 
          }
        );
      }

      // Use actual Ethos score and level
      const actualScore = ethosData.score;
      
      const credibilityScore: CredibilityScore = {
        fid,
        score: actualScore,
        level: ethosData.level,
        ethosData,
      };

      return new Response(
        JSON.stringify(credibilityScore),
        { 
          status: 200, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          } 
        }
      );
    } catch (error) {
      console.error("Error fetching credibility data:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch credibility data" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },

  async OPTIONS() {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  },
}; 