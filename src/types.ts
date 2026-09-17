export type TopicStatus = 'Mastered' | 'Learning' | 'Needs Improvement' | 'Locked';

export interface Topic {
  id: string;
  title: string;
  subject: string;
  mastery: number; // 0 - 100%
  status: TopicStatus;
  quizScore?: number;
  completionRate?: number;
  aiAnalysis: string;
  recommendedActions: string[];
  prerequisites: string[];
  isFocusTopic?: boolean; // added via chatbot or AI recommendation
}

export interface LearningScheduleItem {
  id: string;
  subject: string;
  topic: string;
  duration: string;
  completed?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  subject: string;
  type: 'Notes' | 'Video' | 'PDF' | 'Practice';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  isAiRecommended: boolean;
  whyRecommended?: string;
  summary: string;
  contentSnippet: string;
  relatedTopicId: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  learningInsight?: string;
  actionLabel?: string;
  relatedTopicTitle?: string;
  actionAdded?: boolean;
}

export interface StudentProfile {
  name: string;
  course: string;
  year: string;
  overallProgress: number;
  currentStreak: number;
  topicsMastered: number;
  needsImprovement: number;
}
