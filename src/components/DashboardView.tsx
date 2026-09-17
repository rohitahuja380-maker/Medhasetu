import React from 'react';
import { 
  TrendingUp, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Play, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { StudentProfile, LearningScheduleItem } from '../types';
import { strongTopics, weakTopics } from '../data/curriculumData';

interface DashboardViewProps {
  profile: StudentProfile;
  schedule: LearningScheduleItem[];
  onToggleScheduleItem: (id: string) => void;
  onNavigateToLearningPath: () => void;
  onNavigateToResources: (filterTopic?: string) => void;
  onSelectWeakTopic: (topicTitle: string) => void;
}

export function DashboardView({
  profile,
  schedule,
  onToggleScheduleItem,
  onNavigateToLearningPath,
  onNavigateToResources,
  onSelectWeakTopic
}: DashboardViewProps) {
  return (
    <div id="dashboard-view" className="space-y-6 pb-12">
      {/* Student Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Welcome back, {profile.name}!
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {profile.course}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              {profile.year}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Medha AI analyzed your recent quiz performance and updated your adaptive path.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Adaptive Sync Active
          </span>
        </div>
      </div>

      {/* 4 Core Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Overall Progress */}
        <div 
          id="stat-progress"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Overall Progress
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">{profile.overallProgress}%</span>
              <span className="text-xs font-medium text-emerald-600">+4% this week</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${profile.overallProgress}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Stat 2: Current Streak */}
        <div 
          id="stat-streak"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Current Streak
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">{profile.currentStreak} Days</span>
              <span className="text-xs font-medium text-amber-600">Daily Study Active</span>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className="flex-1 h-2 rounded-full bg-amber-400" 
                  title={`Day ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stat 3: Topics Mastered */}
        <div 
          id="stat-mastered"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Topics Mastered
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">{profile.topicsMastered}</span>
              <span className="text-xs font-medium text-emerald-600">&gt; 80% Mastery</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              SQL Basics, Fundamentals, and more
            </p>
          </div>
        </div>

        {/* Stat 4: Needs Improvement */}
        <div 
          id="stat-needs-improvement"
          className="bg-white p-5 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-white to-amber-50/30 shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              Needs Improvement
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-amber-700">{profile.needsImprovement}</span>
              <span className="text-xs font-medium text-amber-600">Gaps Detected</span>
            </div>
            <p className="text-xs text-amber-700/80 mt-2 font-medium">
              Polymorphism, Normalization...
            </p>
          </div>
        </div>
      </div>

      {/* Highlighted AI Recommendation Card */}
      <div 
        id="medha-ai-recommendation-card"
        className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 rounded-2xl shadow-md border border-indigo-700/60"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Medha AI Recommendation</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Adaptive Gap Detected in C++ OOP
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              "Your recent performance shows difficulty in Polymorphism. We recommend revising Method Overriding before attempting the next quiz."
            </p>
            <div className="flex items-center gap-4 text-xs text-indigo-200 pt-1">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                Current Mastery: 52%
              </span>
              <span>•</span>
              <span>Target: &gt; 75% for Advanced OOP</span>
            </div>
          </div>

          <div className="shrink-0 flex items-center">
            <button
              id="btn-view-learning-path"
              onClick={onNavigateToLearningPath}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 text-sm font-bold shadow-sm transition-all hover:gap-3 cursor-pointer"
            >
              <span>View Learning Path</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Learning & Topic Knowledge State */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Today's Learning Schedule */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Today's Learning</h3>
              <p className="text-xs text-slate-500">Personalized daily study plan</p>
            </div>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              3 items
            </span>
          </div>

          <div className="space-y-3">
            {schedule.map((item, idx) => (
              <div
                key={item.id}
                id={`schedule-item-${idx + 1}`}
                className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  item.completed 
                    ? 'bg-slate-50/70 border-slate-200 opacity-70' 
                    : item.topic === 'Polymorphism'
                      ? 'bg-amber-50/40 border-amber-200/80 hover:border-amber-300'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggleScheduleItem(item.id)}
                    className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors cursor-pointer ${
                      item.completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 hover:border-indigo-600 bg-white'
                    }`}
                    title={item.completed ? 'Mark incomplete' : 'Mark completed'}
                  >
                    {item.completed && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.subject}
                      </span>
                      <h4 className={`text-sm font-semibold ${item.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {item.topic}
                      </h4>
                      {item.topic === 'Polymorphism' && (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
                          Priority Gap
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {item.duration}
                  </span>
                  <button
                    onClick={() => {
                      if (item.topic === 'Polymorphism') {
                        onNavigateToLearningPath();
                      } else {
                        onNavigateToResources(item.topic);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    title={`Open ${item.topic}`}
                  >
                    <Play className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Prioritized by adaptive recommendation algorithm</span>
            <button 
              onClick={() => onNavigateToResources()}
              className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              Browse all resources
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Col: Strong & Weak Topics Analysis */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Topic Knowledge State</h3>
                <p className="text-xs text-slate-500">Based on recent diagnostic assessments</p>
              </div>
            </div>

            {/* Strong Topics Section */}
            <div className="mb-5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Strong Topics (&gt; 80%)</span>
              </div>
              <div className="space-y-2.5">
                {strongTopics.map((topic) => (
                  <div key={topic.id} className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100/80">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-800">{topic.title}</span>
                      <span className="font-bold text-emerald-700">{topic.mastery}%</span>
                    </div>
                    <div className="w-full bg-emerald-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-1.5 rounded-full" 
                        style={{ width: `${topic.mastery}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Topics Section */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 mb-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Weak Topics / Learning Gaps (&lt; 60%)</span>
              </div>
              <div className="space-y-2.5">
                {weakTopics.map((topic) => (
                  <div 
                    key={topic.id} 
                    onClick={() => onSelectWeakTopic(topic.title)}
                    className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-200/60 hover:border-amber-300 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-800">{topic.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({topic.subject})</span>
                      </div>
                      <span className="font-bold text-amber-700">{topic.mastery}%</span>
                    </div>
                    <div className="w-full bg-amber-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-500 h-1.5 rounded-full" 
                        style={{ width: `${topic.mastery}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Select any weak topic to trigger adaptive bridge</span>
            <button 
              onClick={onNavigateToLearningPath}
              className="text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer"
            >
              Explore Node Graph →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
