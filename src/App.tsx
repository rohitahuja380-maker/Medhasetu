import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { LearningPathView } from './components/LearningPathView';
import { ResourceHubView } from './components/ResourceHubView';
import { AskMedhaAiView } from './components/AskMedhaAiView';
import { ResourceModal } from './components/ResourceModal';
import { InteractiveLessonModal } from './components/InteractiveLessonModal';
import { WorkInProgressView } from './components/WorkInProgressView';

import { 
  initialStudentProfile, 
  todaysSchedule, 
  initialLearningPathTopics, 
  curriculumResources, 
  initialChatMessages 
} from './data/curriculumData';
import { generateAiTutorResponse } from './services/aiTutorService';
import { Topic, Resource, ChatMessage, StudentProfile, LearningScheduleItem } from './types';
import { Sparkles, X } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');

  // Persistence State
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('medha_setu_profile');
    return saved ? JSON.parse(saved) : initialStudentProfile;
  });

  const [topics, setTopics] = useState<Topic[]>(() => {
    const saved = localStorage.getItem('medha_setu_topics');
    return saved ? JSON.parse(saved) : initialLearningPathTopics;
  });

  const [schedule, setSchedule] = useState<LearningScheduleItem[]>(() => {
    const saved = localStorage.getItem('medha_setu_schedule');
    return saved ? JSON.parse(saved) : todaysSchedule;
  });

  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('medha_setu_resources');
    return saved ? JSON.parse(saved) : curriculumResources;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('medha_setu_chat');
    return saved ? JSON.parse(saved) : initialChatMessages;
  });

  const [studiedResourceIds, setStudiedResourceIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('medha_setu_studied_res');
    return saved ? JSON.parse(saved) : [];
  });

  // Active Selections
  const [selectedTopicId, setSelectedTopicId] = useState<string>('polymorphism');
  const [activeResourceModal, setActiveResourceModal] = useState<Resource | null>(null);
  const [activeLessonTopic, setActiveLessonTopic] = useState<Topic | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [resourceSearchQuery, setResourceSearchQuery] = useState<string>('');
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // Persist state in localStorage
  useEffect(() => {
    localStorage.setItem('medha_setu_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('medha_setu_topics', JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem('medha_setu_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('medha_setu_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('medha_setu_studied_res', JSON.stringify(studiedResourceIds));
  }, [studiedResourceIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Schedule Toggle
  const handleToggleScheduleItem = (id: string) => {
    setSchedule(prev => 
      prev.map(item => {
        if (item.id === id) {
          const nextState = !item.completed;
          if (nextState) {
            showToast(`Completed "${item.topic}". Knowledge state updated.`);
            setProfile(p => ({ ...p, overallProgress: Math.min(100, p.overallProgress + 2) }));
          }
          return { ...item, completed: nextState };
        }
        return item;
      })
    );
  };

  // Chat message submission with real-time thinking feedback and adaptive tutor reasoning
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsAiThinking(true);

    // Smooth response delay to simulate active AI reasoning and gap analysis
    setTimeout(() => {
      try {
        const response = generateAiTutorResponse(text, profile, topics);
        const aiMsg: ChatMessage = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: response.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          learningInsight: response.learningInsight,
          actionLabel: response.actionLabel,
          relatedTopicTitle: response.relatedTopicTitle,
          actionAdded: false
        };
        setChatMessages(prev => [...prev, aiMsg]);
      } catch (err) {
        const fallbackMsg: ChatMessage = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: `In computer science, thoroughly reviewing prerequisite principles before tackling composite concepts guarantees long-term retention.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          learningInsight: 'Reviewing prerequisite topics will immediately boost your quiz performance.',
          actionLabel: 'Add to Learning Path',
          relatedTopicTitle: 'Polymorphism',
          actionAdded: false
        };
        setChatMessages(prev => [...prev, fallbackMsg]);
      } finally {
        setIsAiThinking(false);
      }
    }, 450);
  };

  const handleClearChat = () => {
    setChatMessages(initialChatMessages);
    localStorage.removeItem('medha_setu_chat');
    showToast('Medha AI conversation reset.');
  };

  // Add to learning path action from Chat Insight
  const handleAddToLearningPath = (topicTitle: string, messageId: string) => {
    setChatMessages(prev => 
      prev.map(m => m.id === messageId ? { ...m, actionAdded: true } : m)
    );

    setTopics(prev => 
      prev.map(t => {
        if (t.title.toLowerCase().includes(topicTitle.toLowerCase()) || 
            (topicTitle.toLowerCase().includes('overrid') && t.id === 'method-overriding') ||
            (topicTitle.toLowerCase().includes('poly') && t.id === 'polymorphism')) {
          return {
            ...t,
            isFocusTopic: true
          };
        }
        return t;
      })
    );

    showToast(`"${topicTitle}" added to your Adaptive Learning Path.`);
  };

  // Lesson completion handler
  const handleLessonCompleted = (topicId: string, newMastery: number) => {
    setTopics(prev => 
      prev.map(t => {
        if (t.id === topicId) {
          const newStatus = newMastery >= 80 ? 'Mastered' : 'Learning';
          return {
            ...t,
            mastery: newMastery,
            status: newStatus,
            aiAnalysis: 'Gap resolved! Runtime polymorphism and virtual dispatch verified via diagnostic drill.'
          };
        }
        if (t.id === 'advanced-oop' && newMastery >= 75) {
          return {
            ...t,
            status: 'Learning',
            aiAnalysis: 'Unlocked! Ready to explore Abstract Classes, Pure Virtual Functions, and Interface contracts.'
          };
        }
        return t;
      })
    );

    setProfile(p => ({
      ...p,
      overallProgress: Math.min(100, p.overallProgress + 6),
      needsImprovement: Math.max(0, p.needsImprovement - 1),
      topicsMastered: newMastery >= 80 ? p.topicsMastered + 1 : p.topicsMastered
    }));

    showToast(`Polymorphism mastery upgraded to ${newMastery}%! Status changed to Learning.`);
  };

  // Mark Resource as studied
  const handleMarkResourceStudied = (resourceId: string) => {
    if (!studiedResourceIds.includes(resourceId)) {
      setStudiedResourceIds(prev => [...prev, resourceId]);
      setProfile(p => ({ ...p, overallProgress: Math.min(100, p.overallProgress + 2) }));
      showToast('Resource marked as completed (+2% Overall Progress).');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header profile={profile} />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          profile={profile}
        />

        {/* Dynamic Main Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentTab === 'dashboard' && (
            <DashboardView
              profile={profile}
              schedule={schedule}
              onToggleScheduleItem={handleToggleScheduleItem}
              onNavigateToLearningPath={() => {
                setSelectedTopicId('polymorphism');
                setCurrentTab('learning-path');
              }}
              onNavigateToResources={(topicTitle) => {
                if (topicTitle) setResourceSearchQuery(topicTitle);
                setCurrentTab('resources');
              }}
              onSelectWeakTopic={(topicTitle) => {
                if (topicTitle.toLowerCase().includes('poly')) {
                  setSelectedTopicId('polymorphism');
                  setCurrentTab('learning-path');
                } else {
                  setResourceSearchQuery(topicTitle);
                  setCurrentTab('resources');
                }
              }}
            />
          )}

          {currentTab === 'learning-path' && (
            <LearningPathView
              topics={topics}
              selectedTopicId={selectedTopicId}
              onSelectTopic={(id) => setSelectedTopicId(id)}
              onStartLesson={(topic) => setActiveLessonTopic(topic)}
              onOpenResource={(topicTitle) => {
                setResourceSearchQuery(topicTitle);
                setCurrentTab('resources');
              }}
            />
          )}

          {currentTab === 'resources' && (
            <ResourceHubView
              resources={resources}
              initialSearchQuery={resourceSearchQuery}
              onOpenResource={(res) => setActiveResourceModal(res)}
            />
          )}

          {currentTab === 'ask-medha' && (
            <AskMedhaAiView
              messages={chatMessages}
              isThinking={isAiThinking}
              onSendMessage={handleSendMessage}
              onClearChat={handleClearChat}
              onAddToLearningPath={handleAddToLearningPath}
              onNavigateToLearningPath={() => {
                setSelectedTopicId('polymorphism');
                setCurrentTab('learning-path');
              }}
            />
          )}

          {currentTab === 'quiz-dev' && (
            <WorkInProgressView
              moduleName="Smart Diagnostic Quiz Engine"
              expectedRelease="Sprint 3 (v1.1)"
              description="Automated adaptive quiz generator that adjusts question difficulty in real-time based on live response latency and Bloom's taxonomy level."
              plannedFeatures={[
                "Dynamic Item Response Theory (IRT) engine",
                "Automated distractor generator for code snippets",
                "Timed coding checkpoints with compile-on-submit",
                "Sub-concept diagnostic error classification"
              ]}
            />
          )}

          {currentTab === 'graph-dev' && (
            <WorkInProgressView
              moduleName="Adaptive Knowledge Graph"
              expectedRelease="Sprint 4 (v1.2)"
              description="Interactive 2D/3D force-directed concept dependency graph mapping multi-semester curriculum prerequisites and cross-course bridges."
              plannedFeatures={[
                "NetworkX directed topological sort",
                "Cross-course dependency visualization (e.g. C++ OOP -> Data Structures)",
                "Visual bottleneck and prerequisite critical path finder",
                "Community detection for related academic domains"
              ]}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <ResourceModal
        resource={activeResourceModal}
        onClose={() => setActiveResourceModal(null)}
        onMarkStudied={handleMarkResourceStudied}
        isStudied={activeResourceModal ? studiedResourceIds.includes(activeResourceModal.id) : false}
      />

      <InteractiveLessonModal
        topic={activeLessonTopic}
        onClose={() => setActiveLessonTopic(null)}
        onLessonCompleted={handleLessonCompleted}
      />

      {/* Clean Toast Notification */}
      {toastMessage && (
        <div 
          id="toast-notification"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs font-semibold"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
