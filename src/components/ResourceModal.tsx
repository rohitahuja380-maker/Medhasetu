import React from 'react';
import { 
  X, 
  BookOpen, 
  Video, 
  FileText, 
  CheckCircle, 
  Sparkles, 
  Clock, 
  ExternalLink,
  Check
} from 'lucide-react';
import { Resource } from '../types';

interface ResourceModalProps {
  resource: Resource | null;
  onClose: () => void;
  onMarkStudied: (resourceId: string) => void;
  isStudied: boolean;
}

export function ResourceModal({
  resource,
  onClose,
  onMarkStudied,
  isStudied
}: ResourceModalProps) {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        id="resource-preview-modal"
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                {resource.subject}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {resource.type}
              </span>
              {resource.isAiRecommended && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  AI Recommended
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              {resource.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Metadata chips */}
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Duration: {resource.duration}
            </span>
            <span>•</span>
            <span className="font-medium">
              Difficulty: <strong className="text-slate-900">{resource.difficulty}</strong>
            </span>
          </div>

          {/* Why Recommended Callout */}
          {resource.whyRecommended && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
              <strong className="font-bold block mb-0.5">Why Medha AI recommended this:</strong>
              <p>{resource.whyRecommended}</p>
            </div>
          )}

          {/* Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Resource Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {resource.summary}
            </p>
          </div>

          {/* Content Reader Preview */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs space-y-2 font-mono">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
              <span>{resource.type.toUpperCase()} PREVIEW • MEDHA-SETU HUB</span>
              <span>100% Student Friendly</span>
            </div>
            <p className="font-sans text-sm text-slate-300 leading-relaxed pt-1">
              {resource.contentSnippet}
            </p>
          </div>

          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 text-xs text-indigo-900 flex items-center justify-between">
            <span>Centralized Resource Hub prevents tab-scattering and saves study time.</span>
            <span className="font-semibold">Integrated Reader</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onMarkStudied(resource.id);
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isStudied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
            }`}
          >
            {isStudied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Marked as Studied (+5% Progress)</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Mark as Studied</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
