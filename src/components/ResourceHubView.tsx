import { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Video, 
  FileText, 
  CheckCircle, 
  Sparkles, 
  Clock, 
  ExternalLink, 
  Tag, 
  Filter,
  Info
} from 'lucide-react';
import { Resource } from '../types';

interface ResourceHubViewProps {
  resources: Resource[];
  initialSearchQuery?: string;
  onOpenResource: (resource: Resource) => void;
}

type FilterType = 'All' | 'Notes' | 'Video' | 'PDF' | 'Practice';

export function ResourceHubView({
  resources,
  initialSearchQuery = '',
  onOpenResource
}: ResourceHubViewProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filterOptions: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'All' },
    { label: 'Notes', value: 'Notes' },
    { label: 'Videos', value: 'Video' },
    { label: 'PDFs', value: 'PDF' },
    { label: 'Practice', value: 'Practice' }
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const matchesSearch = 
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = activeFilter === 'All' || res.type === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [resources, searchQuery, activeFilter]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Notes':
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'Video':
        return <Video className="w-4 h-4 text-rose-600" />;
      case 'PDF':
        return <FileText className="w-4 h-4 text-amber-600" />;
      case 'Practice':
      default:
        return <CheckCircle className="w-4 h-4 text-indigo-600" />;
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div id="resource-hub-view" className="space-y-6 pb-12">
      {/* Header & Subtitle */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Smart Resource Hub
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            All your learning resources in one place — curated by Medha AI to eliminate scattered materials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Centralized Repository
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="resource-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, notes, videos..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Quick Clear if query is active */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-xs font-semibold text-slate-500 shrink-0 mr-1">Type:</span>
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              id={`filter-${opt.value.toLowerCase()}`}
              onClick={() => setActiveFilter(opt.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeFilter === opt.value
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
          <span className="text-xs text-slate-400 ml-auto font-mono">
            {filteredResources.length} items
          </span>
        </div>
      </div>

      {/* Resource Cards Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              id={`resource-card-${res.id}`}
              className={`bg-white rounded-2xl border transition-all flex flex-col justify-between shadow-xs hover:shadow-md ${
                res.isAiRecommended
                  ? 'border-indigo-300 ring-1 ring-indigo-200/60'
                  : 'border-slate-200'
              }`}
            >
              {/* Card Top */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-slate-100 border border-slate-200/80">
                      {getTypeIcon(res.type)}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      {res.type}
                    </span>
                  </div>

                  {res.isAiRecommended && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 animate-pulse">
                      <Sparkles className="w-2.5 h-2.5" />
                      AI Recommended
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1">
                  {res.title}
                </h3>
                <p className="text-xs font-medium text-indigo-700 mb-2.5">
                  {res.subject}
                </p>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {res.summary}
                </p>

                {/* Why recommended explanation card */}
                {res.whyRecommended && (
                  <div className="mt-3.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block">Why recommended?</strong>
                      <span>{res.whyRecommended}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Bottom / Footer */}
              <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getDifficultyBadge(res.difficulty)}`}>
                    {res.difficulty}
                  </span>
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {res.duration}
                  </span>
                </div>

                <button
                  onClick={() => onOpenResource(res)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-indigo-600 text-white transition-colors cursor-pointer"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No resources found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No matching resources for "{searchQuery}" under {activeFilter}. Try broadening your search or switching filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('All');
            }}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
