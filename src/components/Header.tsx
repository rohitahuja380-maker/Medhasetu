import { Bell, Sparkles, User, BrainCircuit } from 'lucide-react';
import { StudentProfile } from '../types';

interface HeaderProps {
  profile: StudentProfile;
}

export function Header({ profile }: HeaderProps) {
  return (
    <header id="main-header" className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-3.5 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                MEDHA-SETU
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Medha AI • Active
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              AI-Powered Adaptive Learning Bridge
            </p>
          </div>
        </div>

        {/* Student Profile Quick View */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="font-semibold text-slate-800">{profile.course}</span>
            <span>•</span>
            <span>{profile.year}</span>
          </div>

          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
              {profile.name.charAt(0)}
            </div>
            <div className="hidden md:block text-left">
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                {profile.name}
              </span>
              <span className="text-[10px] text-emerald-600 font-medium block leading-tight">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
