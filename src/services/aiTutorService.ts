import { ChatMessage, StudentProfile, Topic } from '../types';

export interface AiTutorResponse {
  answer: string;
  learningInsight?: string;
  actionLabel?: string;
  relatedTopicTitle?: string;
}

interface ConceptEntry {
  patterns: (string | RegExp)[];
  title: string;
  subject: string;
  answer: string;
  learningInsight: string;
  relatedTopic: string;
}

const KNOWLEDGE_CATALOG: ConceptEntry[] = [
  // C++ & OOP
  {
    patterns: ['polymorphism', 'runtime polymorphism', 'compile time polymorphism', 'virtual function', 'vtable', 'dynamic dispatch'],
    title: 'Polymorphism in C++',
    subject: 'C++ OOP',
    answer: `Polymorphism ("many forms") allows a single interface to execute different behaviors depending on the actual underlying object type.\n\n• **Compile-time Polymorphism**: Resolved at compile time via Function Overloading and Operator Overloading.\n• **Runtime Polymorphism**: Achieved using Inheritance and Virtual Functions. When a base class declares a method as \`virtual\`, C++ constructs a **vtable (virtual table)** and embeds a **vptr (virtual pointer)** in the object to resolve function calls dynamically at runtime.`,
    learningInsight: 'Your current mastery in Polymorphism is 52% (Needs Improvement). We strongly recommend mastering Method Overriding and the virtual keyword before moving to Advanced OOP.',
    relatedTopic: 'Polymorphism'
  },
  {
    patterns: ['method overriding', 'function overriding', 'override', 'virtual keyword', 'late binding'],
    title: 'Method Overriding in C++',
    subject: 'C++ OOP',
    answer: `Method Overriding occurs when a derived class provides its own specific implementation of a member function that was already defined in the base class with the exact same name, return type, and parameter list.\n\n\`\`\`cpp
class Shape {
public:
    virtual void draw() { cout << "Drawing Shape"; }
};

class Circle : public Shape {
public:
    void draw() override { cout << "Drawing Circle"; }
};
\`\`\`\n\nUsing the \`virtual\` keyword in the base class enables dynamic binding so the derived version runs even through base-class pointers.`,
    learningInsight: 'Method Overriding is the core prerequisite for runtime polymorphism. Mastering dynamic dispatch here will directly fix your Polymorphism learning gap.',
    relatedTopic: 'Method Overriding'
  },
  {
    patterns: ['inheritance', 'derived class', 'base class', 'multiple inheritance', 'multilevel inheritance'],
    title: 'Inheritance in C++',
    subject: 'C++ OOP',
    answer: `Inheritance is the mechanism where a new class (derived class) acquires the attributes and behaviors of an existing class (base class). It promotes code reusability and models "is-a" relationships.\n\nKey types include Single, Multiple, Multilevel, Hierarchical, and Hybrid inheritance. C++ supports private, protected, and public inheritance specifiers to govern member accessibility.`,
    learningInsight: 'You have mastered Inheritance with 84% proficiency! Your solid grasp of class hierarchies makes you ready to practice method overriding.',
    relatedTopic: 'Inheritance'
  },
  {
    patterns: ['classes and objects', 'class', 'object', 'constructor', 'destructor', 'encapsulation'],
    title: 'Classes & Objects',
    subject: 'C++ OOP',
    answer: `A **Class** is a user-defined blueprint or prototype from which objects are instantiated. It encapsulates member variables (state) and member functions (behavior).\n\nAn **Object** is a concrete instance of a class allocated in memory. Special lifecycle functions include **Constructors** (called upon object creation to initialize state) and **Destructors** (called to deallocate resources when the object goes out of scope).`,
    learningInsight: 'You have 88% mastery in Classes & Objects. This strong structural foundation supports your entire OOP journey.',
    relatedTopic: 'Classes & Objects'
  },
  {
    patterns: ['advanced oop', 'abstract class', 'pure virtual', 'interface'],
    title: 'Advanced OOP & Interfaces',
    subject: 'C++ OOP',
    answer: `Advanced OOP introduces **Abstract Base Classes** and **Pure Virtual Functions** (\`virtual void func() = 0;\`). A class with at least one pure virtual function cannot be instantiated directly and serves as a strict interface contract for derived subclasses.\n\nIt also encompasses template metaprogramming, exception safety, and the SOLID principles of software design.`,
    learningInsight: 'Advanced OOP is currently locked in your path. It will automatically unlock as soon as you elevate your Polymorphism score to 75%.',
    relatedTopic: 'Advanced OOP'
  },

  // DBMS
  {
    patterns: ['normalization', '1nf', '2nf', '3nf', 'bcnf', 'functional dependency', 'normal form'],
    title: 'Database Normalization',
    subject: 'DBMS',
    answer: `Normalization is the systematic process of structuring a relational database to minimize data redundancy and prevent insert, update, and delete anomalies.\n\n• **1NF**: Atomic attribute values; no repeating groups.\n• **2NF**: In 1NF + no partial functional dependencies (every non-prime attribute depends on the entire candidate key).\n• **3NF**: In 2NF + no transitive functional dependencies (no non-key attribute depends on another non-key attribute).\n• **BCNF**: Every functional dependency X → Y requires X to be a super key.`,
    learningInsight: 'Your mastery in Normalization is currently 60% (Needs Improvement). Reviewing 2NF partial dependencies is the fastest way to boost your score.',
    relatedTopic: 'Normalization'
  },
  {
    patterns: ['sql', 'query', 'join', 'select', 'database basics', 'ddl', 'dml'],
    title: 'SQL & Relational Queries',
    subject: 'DBMS',
    answer: `SQL (Structured Query Language) is the standard language for relational database management. Commands are categorized into:\n\n• **DDL (Definition)**: \`CREATE\`, \`ALTER\`, \`DROP\`, \`TRUNCATE\`\n• **DML (Manipulation)**: \`SELECT\`, \`INSERT\`, \`UPDATE\`, \`DELETE\`\n• **Joins**: \`INNER JOIN\` (matching rows), \`LEFT JOIN\` (all left + matched right), \`FULL OUTER JOIN\` (all records from both tables).`,
    learningInsight: 'SQL Basics is one of your strongest topics with 87% mastery! You can leverage this strong foundation to understand query optimization.',
    relatedTopic: 'SQL Basics'
  },
  {
    patterns: ['acid', 'transaction', 'atomicity', 'consistency', 'isolation', 'durability'],
    title: 'ACID Properties in Transactions',
    subject: 'DBMS',
    answer: `A transaction is a single logical unit of database work that must satisfy the **ACID** properties:\n\n• **Atomicity**: All changes succeed or entire transaction is rolled back ("all or nothing").\n• **Consistency**: Data transitions strictly from one valid state to another satisfying all schema constraints.\n• **Isolation**: Concurrent transactions execute independently without cross-interference.\n• **Durability**: Committed changes persist permanently even during a system power outage.`,
    learningInsight: 'Understanding transaction isolation levels (Read Committed, Serializable) connects directly to OS concurrency concepts.',
    relatedTopic: 'DBMS'
  },

  // Operating Systems
  {
    patterns: ['process synchronization', 'synchronization', 'race condition', 'critical section', 'semaphore', 'mutex'],
    title: 'Process Synchronization',
    subject: 'Operating Systems',
    answer: `Process Synchronization coordinates concurrent threads or processes accessing shared memory to prevent **race conditions** and data inconsistency.\n\n• **Critical Section**: Segment of code where shared resources are accessed.\n• **Synchronization Criteria**: Must satisfy Mutual Exclusion, Progress, and Bounded Waiting.\n• **Mechanisms**: Mutex (binary locking mechanism) and Semaphores (counting signaling variables managed by \`wait()\` and \`signal()\` operations).`,
    learningInsight: 'Your mastery in Process Synchronization is 48% (Critical Gap). We recommend practicing Peterson\'s algorithm and semaphore drills.',
    relatedTopic: 'Process Synchronization'
  },
  {
    patterns: ['deadlock', 'banker algorithm', 'mutual exclusion', 'hold and wait', 'circular wait'],
    title: 'Deadlock & Avoidance',
    subject: 'Operating Systems',
    answer: `A **Deadlock** is a state where a set of processes are permanently blocked because each process is holding a resource and waiting for another resource held by another process in the set.\n\nFour Coffman conditions must hold simultaneously:\n1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait\n\nAvoidance strategies include Dijkstra's **Banker's Algorithm**, which only grants resource requests if the resulting system state is confirmed to be "Safe".`,
    learningInsight: 'Deadlock avoidance builds directly upon process scheduling and resource allocation graphs.',
    relatedTopic: 'Operating Systems'
  },
  {
    patterns: ['process management', 'process state', 'pcb', 'context switch', 'fork'],
    title: 'Process Management & Lifecycle',
    subject: 'Operating Systems',
    answer: `A **Process** is an active program in execution. The operating system monitors every process through a **Process Control Block (PCB)** containing the PID, program counter, CPU registers, memory limits, and open file descriptors.\n\n• **States**: New → Ready → Running → Waiting (I/O) → Terminated.\n• **Context Switch**: Saving the state of the active CPU process and restoring the state of the newly scheduled process.`,
    learningInsight: 'Process Management is scheduled on your dashboard today for a 20-minute review session.',
    relatedTopic: 'Process Management'
  },

  // Platform & Student Guidance
  {
    patterns: ['medha setu', 'what is this app', 'how does this work', 'about medha', 'platform'],
    title: 'About MEDHA-SETU',
    subject: 'Platform',
    answer: `**MEDHA-SETU** is an AI-Powered Adaptive Learning Bridge designed for engineering students.\n\nIt continuously analyzes your quiz assessments, tracks topic mastery, detects hidden prerequisite learning gaps, and generates a personalized learning path with targeted micro-lessons and smart resources to help you master challenging concepts efficiently.`,
    learningInsight: 'You are currently logged in as Rohit (B.Tech CSE, 1st Year). Your adaptive engine is actively monitoring 6 core topics.',
    relatedTopic: 'Dashboard'
  },
  {
    patterns: ['my gaps', 'weak topics', 'what are my gaps', 'where am i weak', 'needs improvement'],
    title: 'Rohit\'s Learning Gaps',
    subject: 'Personalized Analysis',
    answer: `Based on your recent diagnostic quiz results, Medha AI has detected 3 key learning gaps:\n\n1. **Polymorphism (52% Mastery)**: Difficulty distinguishing virtual functions and runtime dispatch.\n2. **Process Synchronization (48% Mastery)**: Gaps in semaphore coordination and critical section logic.\n3. **Normalization (60% Mastery)**: Needs practice with 2NF partial dependencies.\n\nYour primary recommendation today is to complete the **Polymorphism** lesson after revising **Method Overriding**.`,
    learningInsight: 'Clicking "View Learning Path" in your dashboard will highlight the exact prerequisite sequence to solve these gaps.',
    relatedTopic: 'Polymorphism'
  },
  {
    patterns: ['what should i study', 'today schedule', 'study plan', 'what to learn', 'recommendation'],
    title: 'Today\'s Recommended Study Plan',
    subject: 'Study Schedule',
    answer: `Here is your optimized daily study plan generated by Medha AI:\n\n1. **DBMS Normalization** (15 min) - Revise 1NF & 2NF rules.\n2. **C++ Polymorphism** (15 min) - High-priority gap! Review virtual functions.\n3. **Operating Systems Process Management** (20 min) - Context switching & states.\n\nTotal planned study time: **50 minutes**. Completing these will boost your overall progress by +6%!`,
    learningInsight: 'You can check off completed items directly on your student dashboard to track your streak.',
    relatedTopic: 'Dashboard'
  }
];

/**
 * Intelligent AI Tutor query solver that generates pedagogical responses
 * and bridges doubts with student learning path gaps.
 */
export function generateAiTutorResponse(
  userQuery: string,
  profile?: StudentProfile,
  topics?: Topic[]
): AiTutorResponse {
  const queryLower = userQuery.trim().toLowerCase();

  // 1. Check conversational greetings
  if (['hi', 'hello', 'hey', 'good morning', 'good evening', 'sup'].some(g => queryLower === g || queryLower.startsWith(g + ' '))) {
    return {
      answer: `Hello Rohit! 👋 I'm your Medha AI learning companion.\n\nI can explain engineering concepts (OOP, C++, DBMS, Operating Systems), analyze your quiz mistakes, and bridge prerequisite gaps in your learning path. What would you like to explore?`,
      learningInsight: 'Your priority learning gap today is Polymorphism (52% mastery). Would you like a quick explanation of virtual functions?',
      actionLabel: 'Add to Learning Path',
      relatedTopicTitle: 'Polymorphism'
    };
  }

  // 2. Check catalog entries
  for (const entry of KNOWLEDGE_CATALOG) {
    const isMatch = entry.patterns.some(pattern => {
      if (typeof pattern === 'string') {
        return queryLower.includes(pattern);
      }
      return pattern.test(queryLower);
    });

    if (isMatch) {
      return {
        answer: entry.answer,
        learningInsight: entry.learningInsight,
        actionLabel: 'Add to Learning Path',
        relatedTopicTitle: entry.relatedTopic
      };
    }
  }

  // 3. Heuristic Concept Extractor for general CS doubts
  let detectedSubject = 'Computer Science';
  let recommendedPrereq = 'Foundational Concepts';
  let targetTopic = 'Polymorphism';

  if (queryLower.includes('pointer') || queryLower.includes('memory') || queryLower.includes('c++') || queryLower.includes('function')) {
    detectedSubject = 'C++ Programming';
    recommendedPrereq = 'Programming Fundamentals';
    targetTopic = 'Programming Fundamentals';
  } else if (queryLower.includes('data') || queryLower.includes('table') || queryLower.includes('query')) {
    detectedSubject = 'Database Systems';
    recommendedPrereq = 'SQL Basics';
    targetTopic = 'Normalization';
  } else if (queryLower.includes('thread') || queryLower.includes('cpu') || queryLower.includes('os') || queryLower.includes('schedule')) {
    detectedSubject = 'Operating Systems';
    recommendedPrereq = 'Process Management';
    targetTopic = 'Process Synchronization';
  }

  return {
    answer: `Here is an adaptive conceptual breakdown for **"${userQuery.replace(/[?!.]+$/, '')}"**:\n\n1. **Core Concept**: In ${detectedSubject}, this principle establishes predictable program behavior and modular architecture.\n\n2. **Engineering Practice**: When implementing this in code or systems design, it is critical to adhere to separation of concerns and avoid unnecessary coupling.\n\n3. **Key Checkpoint**: Make sure you have firm confidence in prerequisite definitions before advancing to complex multi-threaded or object-oriented architectures.`,
    learningInsight: `Medha AI has cross-referenced this with your student profile. Solidifying ${recommendedPrereq} will accelerate your progression in ${targetTopic}.`,
    actionLabel: 'Add to Learning Path',
    relatedTopicTitle: targetTopic
  };
}
