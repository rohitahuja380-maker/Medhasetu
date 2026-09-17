import { useState } from 'react';
import { 
  Check, 
  AlertTriangle, 
  Lock, 
  BookOpen, 
  Sparkles, 
  ArrowDown, 
  Play, 
  ChevronRight, 
  Info, 
  TrendingUp, 
  RefreshCw,
  Award
} from 'lucide-react';
import { Topic, TopicStatus } from '../types';

interface LearningPathViewProps {
  topics: Topic[];
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
  onStartLesson: (topic: Topic) => void;
  onOpenResource: (resourceTopic: string) => void;
}

export function LearningPathView({
  topics,
  selectedTopicId,
  onSelectTopic,
  onStartLesson,
  onOpenResource
}: LearningPathViewProps) {
  const selectedTopic = topics.find(t => t.id === selectedTopicId) || topics[4]; // Default to Polymorphism

  const getStatusColor = (status: TopicStatus) => {
    switch (status) {
      case 'Mastered':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-300',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          iconBg: 'bg-emerald-600 text-white',
          line: 'bg-emerald-400'
        };
      case 'Learning':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-300',
          badge: 'bg-blue-100 text-blue-800 border-blue-300',
          iconBg: 'bg-blue-600 text-white',
          line: 'bg-blue-400'
        };
      case 'Needs Improvement':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-400 ring-2 ring-amber-300/60 shadow-md',
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          iconBg: 'bg-amber-500 text-white',
          line: 'bg-amber-400'
        };
      case 'Locked':
      default:
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-200 opacity-60',
          badge: 'bg-slate-100 text-slate-500 border-slate-200',
          iconBg: 'bg-slate-300 text-slate-600',
          line: 'bg-slate-200'
        };
    }
  };

  const getStatusIcon = (status: TopicStatus) => {
    switch (status) {
      case 'Mastered':
        return <Check className="w-5 h-5 stroke-[2.5]" />;
      case 'Learning':
        return <BookOpen className="w-5 h-5 stroke-[2]" />;
      case 'Needs Improvement':
        return <AlertTriangle className="w-5 h-5 stroke-[2.5]" />;
      case 'Locked':
      default:
        return <Lock className="w-5 h-5 stroke-[2]" />;
    }
  };

  return (
    <div id="learning-path-view" className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              AI Adaptive Learning Path
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              Personalized by Medha AI
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            This sequenced DAG (Directed Acyclic Graph) dynamically reorganizes based on Rohit's live concept mastery and prerequisite bottlenecks.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <span className="font-semibold text-slate-600 mr-1">Legend:</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Mastered
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Learning
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Needs Improvement
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-slate-400" /> Locked
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout: Visual Path on Left, Rich Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Node Path */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full max-w-md space-y-0 relative py-2">
            {topics.map((topic, index) => {
              const isSelected = selectedTopic.id === topic.id;
              const style = getStatusColor(topic.status);
              const isLast = index === topics.length - 1;

              return (
                <div key={topic.id} className="relative flex flex-col items-center">
                  {/* Topic Node Card */}
                  <div
                    id={`node-${topic.id}`}
                    onClick={() => onSelectTopic(topic.id)}
                    className={`w-full p-4 rounded-2xl border transition-all cursor-pointer select-none relative z-10 ${
                      style.bg
                    } ${style.border} ${
                      isSelected ? 'ring-3 ring-indigo-500 shadow-lg scale-[1.02]' : 'hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs shrink-0 ${style.iconBg}`}>
                          {getStatusIcon(topic.status)}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-900">
                              {topic.title}
                            </h3>
                            {topic.id === 'polymorphism' && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 animate-pulse">
                                Gap Focus
                              </span>
                            )}
                            {topic.isFocusTopic && topic.id !== 'polymorphism' && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                                AI Queued
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-medium">
                            {topic.subject}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        {topic.status !== 'Locked' ? (
                          <>
                            <span className="text-sm font-bold text-slate-900 block">
                              {topic.mastery}%
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${style.badge}`}>
                              {topic.status}
                            </span>
                          </>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-slate-100 text-slate-500 border-slate-200">
                            Locked
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress indicator inside card */}
                    {topic.status !== 'Locked' && (
                      <div className="w-full bg-slate-200/70 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            topic.status === 'Mastered' 
                              ? 'bg-emerald-500' 
                              : topic.status === 'Needs Improvement' 
                                ? 'bg-amber-500' 
                                : 'bg-blue-500'
                          }`}
                          style={{ width: `${topic.mastery}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Connecting Arrow/Line between nodes */}
                  {!isLast && (
                    <div className="flex flex-col items-center my-2 z-0">
                      <div className={`w-1 h-6 ${style.line}`} />
                      <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center -my-1 text-slate-400">
                        <ArrowDown className="w-3 h-3" />
                      </div>
                      <div className={`w-1 h-2 ${topics[index + 1].status !== 'Locked' ? getStatusColor(topics[index + 1].status).line : 'bg-slate-200'}`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Node Details Card / Modal Focus */}
        <div className="lg:col-span-6 sticky top-20">
          <div 
            id="topic-detail-card"
            className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 relative overflow-hidden"
          >
            {/* AI Highlight Banner */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Node Diagnostic Details
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Personalized by Medha AI
              </span>
            </div>

            {/* Topic Title & Primary Stats */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {selectedTopic.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    Subject: {selectedTopic.subject}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {selectedTopic.mastery}%
                  </span>
                  <p className="text-xs font-medium text-slate-500">Concept Mastery</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-semibold text-slate-500">Status:</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                    getStatusColor(selectedTopic.status).badge
                  }`}
                >
                  {getStatusIcon(selectedTopic.status)}
                  {selectedTopic.status}
                </span>
                {selectedTopic.quizScore !== undefined && (
                  <span className="text-xs text-slate-500">
                    Recent Quiz: <strong className="text-slate-800">{selectedTopic.quizScore}%</strong>
                  </span>
                )}
              </div>
            </div>

            {/* AI Analysis Block (Required verbatim from prompt for Polymorphism) */}
            <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Medha AI Diagnostic Analysis:</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                "{selectedTopic.aiAnalysis}"
              </p>
            </div>

            {/* Recommended Action Items */}
            <div className="mt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Recommended Action Plan:
              </h4>
              <div className="space-y-2">
                {selectedTopic.recommendedActions.map((action, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      {action}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                id="btn-start-recommended-lesson"
                onClick={() => onStartLesson(selectedTopic)}
                disabled={selectedTopic.status === 'Locked'}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-sm ${
                  selectedTopic.status === 'Locked'
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer hover:shadow-md'
                }`}
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Recommended Lesson</span>
              </button>

              <button
                onClick={() => onOpenResource(selectedTopic.title)}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>Related Resources</span>
              </button>
            </div>

            {/* Adaptive Mechanism Note */}
            <div className="mt-4 text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>Completing this lesson updates mastery and unlocks subsequent OOP topics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
