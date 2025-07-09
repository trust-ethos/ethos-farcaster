import { type Handlers } from "$fresh/server.ts";

export interface EthosUserResponse {
  id: number;
  profileId: number;
  displayName: string;
  username: string;
  avatarUrl: string;
  description: string;
  score: number;
  status: string;
  userkeys: string[];
  xpTotal: number;
  xpStreakDays: number;
  stats: {
    review: {
      received: {
        negative: number;
        neutral: number;
        positive: number;
      };
    };
    vouch: {
      given: {
        amountWeiTotal: number;
        count: number;
      };
      received: {
        amountWeiTotal: number;
        count: number;
      };
    };
  };
}

export interface CredibilityScore {
  fid: number;
  score: number;
  level: string;
  hasProfile: boolean;
  user?: EthosUserResponse;
}

async function getEthosUser(fid: number): Promise<EthosUserResponse | null> {
  try {
    const url = `https://api.ethos.network/api/v2/user/by/farcaster/${fid}`;
    
    console.log(`Fetching Ethos user for FID ${fid}`);
    
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

    const data: EthosUserResponse = await response.json();
    console.log(`Ethos user data for FID ${fid}:`, data);
    return data;
  } catch (error) {
    console.error(`Failed to fetch Ethos user for FID ${fid}:`, error);
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
      // Get full Ethos user data
      const userData = await getEthosUser(fid);
      
      // If no data or default values (0 or 1200), treat as no profile
      if (!userData || userData.score === 0 || userData.score === 1200) {
        // User not found in Ethos - return default/unknown state
        const defaultCredibility: CredibilityScore = {
          fid,
          score: 0,
          level: "untrusted",
          hasProfile: false,
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

      // Use actual Ethos user data
      const credibilityScore: CredibilityScore = {
        fid,
        score: userData.score,
        level: getEthosLevel(userData.score),
        hasProfile: true,
        user: userData,
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