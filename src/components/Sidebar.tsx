import { 
  LayoutDashboard, 
  GitFork, 
  BookOpen, 
  Bot, 
  User, 
  Clock,
  HelpCircle,
  Flame,
  Network
} from 'lucide-react';
import { StudentProfile } from '../types';

export type NavTab = 
  | 'dashboard' 
  | 'learning-path' 
  | 'resources' 
  | 'ask-medha'
  | 'quiz-dev'
  | 'graph-dev';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  profile: StudentProfile;
}

export function Sidebar({ currentTab, onSelectTab, profile }: SidebarProps) {
  const primaryNavItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: undefined
    },
    {
      id: 'learning-path' as NavTab,
      label: 'AI Learning Path',
      icon: GitFork,
      badge: 'Active'
    },
    {
      id: 'resources' as NavTab,
      label: 'Smart Resources',
      icon: BookOpen,
      badge: undefined
    },
    {
      id: 'ask-medha' as NavTab,
      label: 'Ask Medha AI',
      icon: Bot,
      badge: 'Tutor'
    }
  ];

  const inDevItems = [
    {
      id: 'quiz-dev' as NavTab,
      label: 'Diagnostic Quiz',
      icon: HelpCircle,
      tag: 'In Progress'
    },
    {
      id: 'graph-dev' as NavTab,
      label: 'Knowledge Graph',
      icon: Network,
      tag: 'Next Sprint'
    }
  ];

  return (
    <aside 
      id="app-sidebar" 
      className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800"
    >
      {/* Top section */}
      <div className="p-4">
        {/* Student Quick Pill */}
        <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700/60 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold text-base shadow-sm">
              {profile.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-100 text-sm truncate">
                  {profile.name}
                </span>
                <span className="inline-flex items-center text-[10px] text-amber-300 font-bold bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-500/30">
                  <Flame className="w-2.5 h-2.5 mr-0.5 fill-amber-400 text-amber-400" />
                  {profile.currentStreak}d
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                {profile.course} • {profile.year}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2">
            Platform Modules
          </p>
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive
                        ? 'bg-indigo-700/80 text-white'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Under Active Development by the Team */}
        <div className="mt-8 pt-4 border-t border-slate-800/80">
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              In Development
            </span>
            <span className="text-[9px] text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
              Team Working
            </span>
          </div>
          <div className="space-y-1">
            {inDevItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-amber-300 font-semibold border border-slate-700'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                    {item.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Profile Section */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div 
          id="profile-footer"
          className="flex items-center justify-between p-2 rounded-lg"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">
                {profile.name}
              </p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Adaptive Sync On
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
