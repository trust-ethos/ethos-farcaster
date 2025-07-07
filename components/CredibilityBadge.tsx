import { type CredibilityScore } from "../types/ethos.ts";
import { type ComponentChildren } from "preact";

interface CredibilityBadgeProps {
  score: number;
  rank?: number;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  attestationCount?: number;
}

export function CredibilityBadge({ 
  score, 
  rank, 
  size = 'medium', 
  showDetails = false,
  attestationCount = 0 
}: CredibilityBadgeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return 'High';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Low';
  };

  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-2',
  };

  if (showDetails) {
    return (
      <div class="inline-flex items-center space-x-2">
        <div class={`${getScoreColor(score)} ${sizeClasses[size]} text-white rounded-full font-semibold`}>
          {score}
        </div>
        <span class="text-sm text-gray-600">
          {getScoreText(score)}
        </span>
        {rank && (
          <span class="text-sm text-gray-500">
            #{rank}
          </span>
        )}
        {attestationCount > 0 && (
          <span class="text-xs text-gray-400">
            {attestationCount} attestations
          </span>
        )}
      </div>
    );
  }

  return (
    <div 
      class={`inline-flex items-center ${getScoreColor(score)} ${sizeClasses[size]} text-white rounded-full font-semibold cursor-pointer hover:opacity-80 transition-opacity`}
      title={`Credibility: ${score}/100 (${getScoreText(score)})`}
    >
      {score}
    </div>
  );
}

interface CredibilityTooltipProps {
  credibility: CredibilityScore;
  children: ComponentChildren;
}

export function CredibilityTooltip({ credibility, children }: CredibilityTooltipProps) {
  return (
    <div class="relative group">
      {children}
      <div class="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-sm rounded-lg p-3 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64">
        <div class="font-semibold mb-2">Credibility Breakdown</div>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span>Overall Score:</span>
            <span class="font-semibold">{credibility.score}/100</span>
          </div>
          <div class="flex justify-between">
            <span>Trustworthiness:</span>
            <span>{credibility.breakdown.trustworthiness}%</span>
          </div>
          <div class="flex justify-between">
            <span>Expertise:</span>
            <span>{credibility.breakdown.expertise}%</span>
          </div>
          <div class="flex justify-between">
            <span>Reliability:</span>
            <span>{credibility.breakdown.reliability}%</span>
          </div>
          <div class="flex justify-between">
            <span>Engagement:</span>
            <span>{credibility.breakdown.engagement}%</span>
          </div>
        </div>
        <div class="mt-2 pt-2 border-t border-gray-700">
          <div class="flex justify-between text-xs">
            <span>Rank: #{credibility.rank}</span>
            <span>{credibility.attestations} attestations</span>
          </div>
        </div>
        {/* Tooltip arrow */}
        <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
} 