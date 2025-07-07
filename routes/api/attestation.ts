import { type Handlers } from "$fresh/server.ts";

export interface AttestationRequest {
  targetFid: number;
  category: 'trustworthiness' | 'expertise' | 'reliability' | 'engagement';
  score: number; // 1-100
  comment?: string;
  evidence?: string; // URL or text reference
}

export interface AttestationResponse {
  id: string;
  fromFid: number;
  targetFid: number;
  category: string;
  score: number;
  comment?: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'rejected';
}

export const handler: Handlers = {
  async POST(req) {
    try {
      const attestationData: AttestationRequest = await req.json();
      
      // Validate attestation data
      if (!attestationData.targetFid || !attestationData.category || !attestationData.score) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      if (attestationData.score < 1 || attestationData.score > 100) {
        return new Response(
          JSON.stringify({ error: "Score must be between 1 and 100" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Here you would:
      // 1. Authenticate the user via Farcaster Quick Auth
      // 2. Validate they haven't already attested this user recently
      // 3. Submit to Ethos API
      // 4. Store in your database
      // 5. Optionally post to Farcaster as a cast

      const attestationResponse: AttestationResponse = {
        id: crypto.randomUUID(),
        fromFid: 456, // Would come from auth token
        targetFid: attestationData.targetFid,
        category: attestationData.category,
        score: attestationData.score,
        comment: attestationData.comment,
        timestamp: new Date().toISOString(),
        status: 'pending',
      };

      return new Response(
        JSON.stringify(attestationResponse),
        { 
          status: 201, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          } 
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Failed to submit attestation" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },

  async GET(req) {
    const url = new URL(req.url);
    const fid = url.searchParams.get('fid');
    
    if (!fid) {
      return new Response(
        JSON.stringify({ error: "FID required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Mock attestation data
    const mockAttestations: AttestationResponse[] = [
      {
        id: "att-1",
        fromFid: 789,
        targetFid: parseInt(fid),
        category: "trustworthiness",
        score: 95,
        comment: "Consistently provides valuable insights",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        status: 'confirmed',
      },
      {
        id: "att-2",
        fromFid: 321,
        targetFid: parseInt(fid),
        category: "expertise",
        score: 88,
        comment: "Deep knowledge in DeFi protocols",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        status: 'confirmed',
      },
    ];

    return new Response(
      JSON.stringify(mockAttestations),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        } 
      }
    );
  },

  async OPTIONS() {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  },
}; 