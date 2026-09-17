import { TopicStatus } from '../types';

export interface PerformanceMetric {
  quizScore: number;
  topicMastery: number;
  completionRate: number;
}

export interface RecommendationResult {
  computedMastery: number;
  status: TopicStatus;
  primaryRecommendation: string;
  isGapDetected: boolean;
  actionItems: string[];
}

/**
 * Adaptive evaluation engine for topic mastery and gap detection.
 * Weights: quiz performance (50%), historical mastery (30%), resource completion (20%)
 */
export function evaluateKnowledgeState(metric: PerformanceMetric): RecommendationResult {
  const computedMastery = Math.round(
    metric.quizScore * 0.5 + metric.topicMastery * 0.3 + metric.completionRate * 0.2
  );

  let status: TopicStatus;
  let primaryRecommendation: string;
  let isGapDetected = false;
  let actionItems: string[] = [];

  if (computedMastery < 60) {
    status = 'Needs Improvement';
    isGapDetected = true;
    primaryRecommendation = 'Revision + Practice';
    actionItems = [
      'Revise foundational prerequisites',
      'Watch recommended micro-concept explanation',
      'Solve 3 diagnostic practice questions'
    ];
  } else if (computedMastery <= 80) {
    status = 'Learning';
    primaryRecommendation = 'Practice + Quiz';
    actionItems = [
      'Review core implementation syntax',
      'Complete chapter coding drills',
      'Attempt 5-minute checkpoint quiz'
    ];
  } else {
    status = 'Mastered';
    primaryRecommendation = 'Advanced Topic';
    actionItems = [
      'Apply concept in real-world applications',
      'Explore edge cases and interview questions',
      'Proceed to next locked topic'
    ];
  }

  return {
    computedMastery,
    status,
    primaryRecommendation,
    isGapDetected,
    actionItems
  };
}

export function detectGaps(topics: { title: string; mastery: number }[]) {
  return topics.filter(t => t.mastery < 60);
}
