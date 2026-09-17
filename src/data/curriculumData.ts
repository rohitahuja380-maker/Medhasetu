import { StudentProfile, Topic, LearningScheduleItem, Resource, ChatMessage } from '../types';

export const initialStudentProfile: StudentProfile = {
  name: 'Rohit',
  course: 'B.Tech CSE',
  year: '1st Year',
  overallProgress: 68,
  currentStreak: 7,
  topicsMastered: 18,
  needsImprovement: 4
};

export const todaysSchedule: LearningScheduleItem[] = [
  {
    id: 'sched-1',
    subject: 'DBMS',
    topic: 'Normalization',
    duration: '15 min',
    completed: false
  },
  {
    id: 'sched-2',
    subject: 'C++',
    topic: 'Polymorphism',
    duration: '15 min',
    completed: false
  },
  {
    id: 'sched-3',
    subject: 'Operating Systems',
    topic: 'Process Management',
    duration: '20 min',
    completed: false
  }
];

export const strongTopics = [
  { id: 'st-1', title: 'SQL Basics', mastery: 87, subject: 'DBMS' },
  { id: 'st-2', title: 'Programming Fundamentals', mastery: 91, subject: 'Computer Science' }
];

export const weakTopics = [
  { id: 'wt-1', title: 'Polymorphism', mastery: 52, subject: 'C++ OOP' },
  { id: 'wt-2', title: 'Normalization', mastery: 60, subject: 'DBMS' },
  { id: 'wt-3', title: 'Process Synchronization', mastery: 48, subject: 'Operating Systems' }
];

export const initialLearningPathTopics: Topic[] = [
  {
    id: 'prog-fund',
    title: 'Programming Fundamentals',
    subject: 'C++ Core',
    mastery: 91,
    status: 'Mastered',
    quizScore: 92,
    completionRate: 100,
    aiAnalysis: 'Strong mastery of control flow, primitive data types, memory allocation, and basic function pointers.',
    recommendedActions: [
      'Foundational prerequisites complete',
      'Eligible to mentor peer study groups'
    ],
    prerequisites: []
  },
  {
    id: 'classes-objects',
    title: 'Classes & Objects',
    subject: 'C++ OOP',
    mastery: 88,
    status: 'Mastered',
    quizScore: 86,
    completionRate: 95,
    aiAnalysis: 'Solid grasp of member encapsulation, constructors/destructors, and access specifiers.',
    recommendedActions: [
      'Encapsulation patterns verified',
      'Ready for hierarchical class composition'
    ],
    prerequisites: ['Programming Fundamentals']
  },
  {
    id: 'inheritance',
    title: 'Inheritance',
    subject: 'C++ OOP',
    mastery: 84,
    status: 'Mastered',
    quizScore: 85,
    completionRate: 90,
    aiAnalysis: 'Consistent application of derived classes, base initializers, and protected visibility levels.',
    recommendedActions: [
      'Multiple and multilevel inheritance verified',
      'Direct prerequisite for function overriding'
    ],
    prerequisites: ['Classes & Objects']
  },
  {
    id: 'method-overriding',
    title: 'Method Overriding',
    subject: 'C++ OOP',
    mastery: 82,
    status: 'Mastered',
    quizScore: 80,
    completionRate: 88,
    aiAnalysis: 'Understands base function signature matching; requires reinforcement on the virtual keyword and dynamic dispatch mechanics.',
    recommendedActions: [
      'Revise virtual keyword usage in C++',
      'Direct prerequisite to solve your Polymorphism gap'
    ],
    prerequisites: ['Inheritance']
  },
  {
    id: 'polymorphism',
    title: 'Polymorphism',
    subject: 'C++ OOP',
    mastery: 52,
    status: 'Needs Improvement',
    quizScore: 48,
    completionRate: 65,
    aiAnalysis: 'Your recent quiz performance indicates that you need more practice with runtime polymorphism and method overriding.',
    recommendedActions: [
      'Revise Method Overriding',
      'Watch a short explanation',
      'Practice 3 questions'
    ],
    prerequisites: ['Method Overriding']
  },
  {
    id: 'advanced-oop',
    title: 'Advanced OOP',
    subject: 'C++ OOP',
    mastery: 0,
    status: 'Locked',
    quizScore: 0,
    completionRate: 0,
    aiAnalysis: 'Locked until Polymorphism reaches ≥ 75% mastery. Covers abstract base classes, pure virtual functions, and interface contracts.',
    recommendedActions: [
      'Complete Polymorphism diagnostic practice',
      'Reach at least 75% mastery in Polymorphism to unlock'
    ],
    prerequisites: ['Polymorphism']
  }
];

export const curriculumResources: Resource[] = [
  {
    id: 'res-1',
    title: 'DBMS Normalization',
    subject: 'DBMS',
    type: 'Notes',
    difficulty: 'Intermediate',
    duration: '15 min',
    isAiRecommended: true,
    whyRecommended: 'Recommended because your mastery in this topic is below 60%.',
    summary: 'Comprehensive revision notes breaking down 1NF, 2NF, 3NF, and BCNF with functional dependencies.',
    contentSnippet: 'Normalization is the process of organizing data in a relational database to reduce data redundancy and improve data integrity. 1NF eliminates duplicate columns, 2NF removes partial functional dependencies, and 3NF eliminates transitive functional dependencies.',
    relatedTopicId: 'normalization'
  },
  {
    id: 'res-2',
    title: 'C++ Polymorphism',
    subject: 'C++ OOP',
    type: 'Video',
    difficulty: 'Intermediate',
    duration: '12 min',
    isAiRecommended: true,
    whyRecommended: 'Critical learning gap detected (52% mastery). Recommended before attempting next test.',
    summary: 'Visual interactive breakdown of compile-time vs runtime polymorphism, virtual functions, and vtable pointer mechanics.',
    contentSnippet: 'In this 12-minute micro-lesson, we visualize how dynamic dispatch uses the vptr and vtable in C++ to resolve function calls at runtime rather than compile-time.',
    relatedTopicId: 'polymorphism'
  },
  {
    id: 'res-3',
    title: 'Operating System Processes',
    subject: 'Operating Systems',
    type: 'PDF',
    difficulty: 'Beginner',
    duration: '20 min',
    isAiRecommended: false,
    summary: 'Visual architecture guide on PCB, process states (Ready, Running, Waiting), and context switching.',
    contentSnippet: 'A process is a program in execution. The operating system manages processes using the Process Control Block (PCB) which stores the Program Counter, registers, memory limits, and list of open files.',
    relatedTopicId: 'process-management'
  },
  {
    id: 'res-4',
    title: 'Method Overriding Revision Sheet',
    subject: 'C++ OOP',
    type: 'Notes',
    difficulty: 'Intermediate',
    duration: '10 min',
    isAiRecommended: true,
    whyRecommended: 'Identified by Medha AI as the direct prerequisite to conquer Polymorphism.',
    summary: 'Quick cheat-sheet contrasting Function Overloading with Function Overriding and the virtual keyword.',
    contentSnippet: 'Function Overriding occurs when a derived class defines a function with the identical signature as in its base class. Use the "virtual" keyword in the base class to enable late binding.',
    relatedTopicId: 'method-overriding'
  },
  {
    id: 'res-5',
    title: 'Process Synchronization & Semaphores',
    subject: 'Operating Systems',
    type: 'Practice',
    difficulty: 'Intermediate',
    duration: '25 min',
    isAiRecommended: true,
    whyRecommended: 'Your mastery is currently 48%. Practice Peterson solution and counting semaphores.',
    summary: 'Hands-on practice exercises tackling race conditions, critical section problems, and mutexes.',
    contentSnippet: 'Practice solving the Critical Section Problem using Dijkstra semaphores. Ensure all three requirements are met: Mutual Exclusion, Progress, and Bounded Waiting.',
    relatedTopicId: 'process-sync'
  },
  {
    id: 'res-6',
    title: 'SQL Basics & Relational Queries',
    subject: 'DBMS',
    type: 'Practice',
    difficulty: 'Beginner',
    duration: '18 min',
    isAiRecommended: false,
    summary: 'Self-assessment quiz covering SELECT, JOIN, GROUP BY, and subqueries.',
    contentSnippet: 'Review your strong understanding of DDL and DML commands. Test your query skills on multi-table joins and aggregate functions.',
    relatedTopicId: 'sql-basics'
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-init',
    sender: 'ai',
    text: 'Hi Rohit 👋\nWhat would you like to learn today?',
    timestamp: 'Just now'
  }
];

export interface AiKnowledgePattern {
  keywords: string[];
  answer: string;
  learningInsight: string;
  actionLabel: string;
  relatedTopicTitle: string;
}

export const aiKnowledgeBase: AiKnowledgePattern[] = [
  {
    keywords: ['polymorphism', 'polymorph', 'poly', 'virtual function'],
    answer: 'Polymorphism is an OOP concept that allows the same interface or method to behave differently depending on the object.',
    learningInsight: 'You may want to revise Method Overriding before moving to advanced polymorphism.',
    actionLabel: 'Add to Learning Path',
    relatedTopicTitle: 'Polymorphism'
  },
  {
    keywords: ['normalization', 'normalise', 'normal form', 'dbms'],
    answer: 'Normalization is a systematic approach to decomposing database tables to eliminate data redundancy and insertion/update/deletion anomalies. The standard stages are 1NF, 2NF, 3NF, and BCNF.',
    learningInsight: 'Your mastery in Normalization is at 60%. Reviewing 2NF partial functional dependencies will solidify your schema design.',
    actionLabel: 'Add to Learning Path',
    relatedTopicTitle: 'Normalization'
  },
  {
    keywords: ['process synchronization', 'synchronization', 'semaphore', 'critical section', 'race condition'],
    answer: 'Process synchronization coordinates concurrent processes that access shared resources to prevent race conditions and preserve data consistency in the operating system.',
    learningInsight: 'Your mastery in Process Synchronization is currently 48%. We recommend reviewing Peterson algorithm and counting semaphores.',
    actionLabel: 'Add to Learning Path',
    relatedTopicTitle: 'Process Synchronization'
  },
  {
    keywords: ['method overriding', 'overriding', 'virtual'],
    answer: 'Method overriding allows a derived class to supply a specific implementation of a function already defined in its base class. Both functions must possess matching signatures and return types.',
    learningInsight: 'Understanding the `virtual` keyword here directly unlocks the solution to your Polymorphism gap!',
    actionLabel: 'Add to Learning Path',
    relatedTopicTitle: 'Method Overriding'
  }
];
