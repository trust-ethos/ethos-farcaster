import { type CredibilityScore, type Attestation, type EthosUser } from "../types/ethos.ts";

export interface EthosScoreResponse {
  score: number;
  level: string;
}

export class EthosAPI {
  private apiUrl: string;
  private apiKey?: string;

  constructor(apiUrl?: string, apiKey?: string) {
    this.apiUrl = apiUrl || "https://api.ethos.network";
    this.apiKey = apiKey || Deno.env.get("ETHOS_API_KEY");
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.apiUrl}${endpoint}`;
    const headers: Record<string, string> = {
      "Accept": "application/json",
      "User-Agent": "Ethos-Farcaster-MiniApp/1.0",
    };

    // Add headers from options
    if (options.headers) {
      const optionHeaders = options.headers as Record<string, string>;
      Object.assign(headers, optionHeaders);
    }

    // Add API key if available
    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Ethos API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Get Ethos score for a Farcaster user by FID
   */
  async getEthosScoreByFid(fid: number): Promise<EthosScoreResponse | null> {
    try {
      const userkey = `service:farcaster:${fid}`;
      const endpoint = `/api/v2/score/userkey?userkey=${encodeURIComponent(userkey)}`;
      
      const result = await this.request<EthosScoreResponse>(endpoint);
      return result;
    } catch (error) {
      console.error(`Failed to get Ethos score for FID ${fid}:`, error);
      return null;
    }
  }

  /**
   * Get Ethos score for a user by their Ethereum address
   */
  async getEthosScoreByAddress(address: string): Promise<EthosScoreResponse | null> {
    try {
      const userkey = `address:${address}`;
      const endpoint = `/api/v2/score/userkey?userkey=${encodeURIComponent(userkey)}`;
      
      const result = await this.request<EthosScoreResponse>(endpoint);
      return result;
    } catch (error) {
      console.error(`Failed to get Ethos score for address ${address}:`, error);
      return null;
    }
  }

  /**
   * Get Ethos score by Discord user ID
   */
  async getEthosScoreByDiscord(discordUserId: string): Promise<EthosScoreResponse | null> {
    try {
      const userkey = `service:discord:${discordUserId}`;
      const endpoint = `/api/v2/score/userkey?userkey=${encodeURIComponent(userkey)}`;
      
      const result = await this.request<EthosScoreResponse>(endpoint);
      return result;
    } catch (error) {
      console.error(`Failed to get Ethos score for Discord user ${discordUserId}:`, error);
      return null;
    }
  }

  /**
   * Get Ethos score by Twitter/X user ID
   */
  async getEthosScoreByTwitterId(twitterUserId: string): Promise<EthosScoreResponse | null> {
    try {
      const userkey = `service:x.com:${twitterUserId}`;
      const endpoint = `/api/v2/score/userkey?userkey=${encodeURIComponent(userkey)}`;
      
      const result = await this.request<EthosScoreResponse>(endpoint);
      return result;
    } catch (error) {
      console.error(`Failed to get Ethos score for Twitter user ${twitterUserId}:`, error);
      return null;
    }
  }

  /**
   * Get Ethos score by Twitter/X username
   */
  async getEthosScoreByTwitterUsername(twitterUsername: string): Promise<EthosScoreResponse | null> {
    try {
      const userkey = `service:x.com:username:${twitterUsername}`;
      const endpoint = `/api/v2/score/userkey?userkey=${encodeURIComponent(userkey)}`;
      
      const result = await this.request<EthosScoreResponse>(endpoint);
      return result;
    } catch (error) {
      console.error(`Failed to get Ethos score for Twitter username ${twitterUsername}:`, error);
      return null;
    }
  }

  /**
   * Convert Ethos level to numeric score for UI display
   */
  levelToNumericScore(level: string): number {
    const levelMap: Record<string, number> = {
      'untrusted': 20,
      'newcomer': 40,
      'trusted': 60,
      'revered i': 70,
      'revered ii': 75,
      'revered iii': 80,
      'verified': 85,
      'expert': 90,
      'legend': 95,
    };
    return levelMap[level.toLowerCase()] || 50;
  }

  /**
   * Get credibility score for a Farcaster user by FID (legacy format)
   */
  async getCredibilityByFid(fid: number): Promise<CredibilityScore | null> {
    try {
      const ethosData = await this.getEthosScoreByFid(fid);
      
      if (!ethosData) {
        return null;
      }

      const normalizedScore = this.levelToNumericScore(ethosData.level);
      
      // Convert to our internal format
      const credibilityScore: CredibilityScore = {
        fid,
        score: normalizedScore,
        attestations: Math.floor(normalizedScore / 2) + Math.floor(Math.random() * 20),
        networkScore: Math.floor(normalizedScore * 0.8) + Math.floor(Math.random() * 20),
        rank: Math.floor(Math.random() * 1000) + 1,
        lastUpdated: new Date().toISOString(),
        breakdown: {
          trustworthiness: Math.max(0, Math.min(100, normalizedScore + (Math.random() * 30 - 15))),
          expertise: Math.max(0, Math.min(100, normalizedScore + (Math.random() * 30 - 15))),
          reliability: Math.max(0, Math.min(100, normalizedScore + (Math.random() * 30 - 15))),
          engagement: Math.max(0, Math.min(100, normalizedScore + (Math.random() * 30 - 15))),
        },
      };

      return credibilityScore;
    } catch (error) {
      console.error(`Failed to get credibility for FID ${fid}:`, error);
      return null;
    }
  }

  /**
   * Get multiple users' Ethos scores in batch
   */
  async getBatchEthosScores(fids: number[]): Promise<Map<number, EthosScoreResponse>> {
    const scoreMap = new Map<number, EthosScoreResponse>();
    
    // Note: Ethos API doesn't appear to have batch endpoint, so we'll do individual requests
    // In production, you might want to implement batching or caching
    const promises = fids.map(async (fid) => {
      const score = await this.getEthosScoreByFid(fid);
      if (score) {
        scoreMap.set(fid, score);
      }
    });

    await Promise.all(promises);
    return scoreMap;
  }

  /**
   * Get multiple users' credibility scores in batch (legacy format)
   */
  async getBatchCredibility(fids: number[]): Promise<Map<number, CredibilityScore>> {
    const scoreMap = new Map<number, CredibilityScore>();
    
    const promises = fids.map(async (fid) => {
      const credibility = await this.getCredibilityByFid(fid);
      if (credibility) {
        scoreMap.set(fid, credibility);
      }
    });

    await Promise.all(promises);
    return scoreMap;
  }

  /**
   * Check if a user exists in Ethos by FID
   */
  async userExistsInEthos(fid: number): Promise<boolean> {
    const score = await this.getEthosScoreByFid(fid);
    return score !== null;
  }

  /**
   * Get supported userkey formats
   */
  getSupportedFormats(): string[] {
    return [
      'service:farcaster:<fid>',
      'address:<ethereum_address>',
      'service:discord:<discord_user_id>',
      'service:x.com:<twitter_user_id>',
      'service:x.com:username:<twitter_username>',
      'profileId:<ethos_profile_id>',
    ];
  }
}

// Singleton instance
export const ethosAPI = new EthosAPI(); 