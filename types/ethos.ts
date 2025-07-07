// Ethos-specific types for credibility and attestations

export interface EthosUser {
  fid: number;
  address?: string;
  username?: string;
  displayName?: string;
  credibilityScore: CredibilityScore;
}

export interface CredibilityScore {
  fid: number;
  score: number;
  attestations: number;
  networkScore: number;
  rank: number;
  lastUpdated: string;
  breakdown: ScoreBreakdown;
}

export interface ScoreBreakdown {
  trustworthiness: number;
  expertise: number;
  reliability: number;
  engagement: number;
}

export interface Attestation {
  id: string;
  fromFid: number;
  toFid: number;
  score: number;
  category: AttestationCategory;
  comment?: string;
  timestamp: string;
  signature: string;
}

export enum AttestationCategory {
  TRUSTWORTHINESS = 'trustworthiness',
  EXPERTISE = 'expertise',
  RELIABILITY = 'reliability',
  ENGAGEMENT = 'engagement',
}

export interface AttestationSummary {
  totalReceived: number;
  totalGiven: number;
  averageReceived: number;
  averageGiven: number;
  byCategory: Record<AttestationCategory, number>;
}

export interface NetworkStats {
  connections: number;
  mutualConnections: number;
  trustRadius: number;
  centralityScore: number;
}

export interface FarcasterProfile {
  fid: number;
  username: string;
  displayName: string;
  bio: string;
  pfpUrl: string;
  followerCount: number;
  followingCount: number;
  verifiedAddresses: string[];
}

export interface MiniAppState {
  user: EthosUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
} 