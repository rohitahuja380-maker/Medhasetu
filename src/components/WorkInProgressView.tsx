import { Hammer, Clock, GitBranch, Cpu, AlertCircle, Sparkles } from 'lucide-react';

interface WorkInProgressViewProps {
  moduleName: string;
  expectedRelease: string;
  description: string;
  plannedFeatures: string[];
}

export function WorkInProgressView({
  moduleName,
  expectedRelease,
  description,
  plannedFeatures
}: WorkInProgressViewProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6 animate-fadeIn">
      {/* Header card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              In Active Development
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Sprint Target: {expectedRelease}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {moduleName}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {description}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
          <span className="text-xs font-bold text-slate-700">Team Engineering</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-2xs">
          <Hammer className="w-8 h-8" />
        </div>

        <div className="max-w-md mx-auto space-y-2">
          <h3 className="text-lg font-bold text-slate-900">
            The team is actively building this module
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            The core adaptive engine (Dashboard, AI Learning Path, Resource Hub, and Ask Medha AI) is live. Our engineers are currently developing the backend pipeline for this expansion.
          </p>
        </div>

        {/* Feature roadmap cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto pt-2">
          {plannedFeatures.map((feat, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-slate-700 font-medium">{feat}</span>
            </div>
          ))}
        </div>

        {/* Architecture snippet */}
        <div className="max-w-xl mx-auto p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono text-left space-y-1 overflow-x-auto">
          <div className="text-slate-500 text-[10px] border-b border-slate-800 pb-1 flex items-center justify-between">
            <span>// PIPELINE INTEGRATION IN PROGRESS</span>
            <span className="text-amber-400">git: feature/{moduleName.toLowerCase().replace(/\s+/g, '-')}</span>
          </div>
          <p className="text-slate-400 pt-1">def evaluate_checkpoint_stream(student_id, session_vector):</p>
          <p className="text-indigo-400 pl-4"># Bayesian Knowledge Tracing & adaptive routing</p>
          <p className="text-slate-300 pl-4">return ml_pipeline.generate_dynamic_graph(student_id)</p>
        </div>
      </div>
    </div>
  );
}
