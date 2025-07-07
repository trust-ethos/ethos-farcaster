import { type Handlers } from "$fresh/server.ts";

export interface CastWithCredibility {
  hash: string;
  author: {
    fid: number;
    username: string;
    displayName: string;
    pfpUrl: string;
    credibilityScore: number;
    credibilityRank: number;
    trustLevel: 'high' | 'medium' | 'low';
  };
  text: string;
  timestamp: string;
  reactions: {
    likes: number;
    recasts: number;
    replies: number;
  };
  credibilityContext: {
    authorTrustworthiness: number;
    topicExpertise?: number;
    networkEndorsements: number;
    attestationCount: number;
  };
}

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const castHash = url.searchParams.get('hash');
    
    if (!castHash) {
      return new Response(
        JSON.stringify({ error: "Cast hash required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      // This would integrate with:
      // 1. Farcaster Hub/API to get cast data
      // 2. Ethos API to get credibility scores
      // 3. Your own database for cached credibility data
      
      const mockCastData: CastWithCredibility = {
        hash: castHash,
        author: {
          fid: 123,
          username: "ethosuser",
          displayName: "Ethos User",
          pfpUrl: "https://example.com/pfp.jpg",
          credibilityScore: 87,
          credibilityRank: 156,
          trustLevel: 'high',
        },
        text: "This is a sample cast with credibility context",
        timestamp: new Date().toISOString(),
        reactions: {
          likes: 42,
          recasts: 12,
          replies: 8,
        },
        credibilityContext: {
          authorTrustworthiness: 92,
          topicExpertise: 85,
          networkEndorsements: 78,
          attestationCount: 156,
        },
      };

      return new Response(
        JSON.stringify(mockCastData),
        { 
          status: 200, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          } 
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch cast credibility data" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
}; 