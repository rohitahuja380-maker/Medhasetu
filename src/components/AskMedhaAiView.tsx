import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  PlusCircle, 
  Check, 
  Lightbulb, 
  ArrowRight,
  HelpCircle,
  RotateCcw,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { ChatMessage } from '../types';

interface AskMedhaAiViewProps {
  messages: ChatMessage[];
  isThinking?: boolean;
  onSendMessage: (text: string) => void;
  onClearChat?: () => void;
  onAddToLearningPath: (topicTitle: string, messageId: string) => void;
  onNavigateToLearningPath: () => void;
}

export function AskMedhaAiView({
  messages,
  isThinking = false,
  onSendMessage,
  onClearChat,
  onAddToLearningPath,
  onNavigateToLearningPath
}: AskMedhaAiViewProps) {
  const [inputValue, setInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'oop' | 'dbms' | 'os' | 'gaps'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'oop', label: 'C++ OOP' },
    { id: 'dbms', label: 'DBMS' },
    { id: 'os', label: 'Operating Systems' },
    { id: 'gaps', label: 'My Learning Gaps' }
  ];

  const categoryQuestions: Record<string, string[]> = {
    all: [
      'What is polymorphism?',
      'Explain normalization.',
      'What is process synchronization?',
      'What are my weak topics?',
      'What should I study today?'
    ],
    oop: [
      'What is polymorphism?',
      'How does method overriding work?',
      'Explain inheritance with an example.',
      'What is the difference between classes and objects?'
    ],
    dbms: [
      'Explain normalization and 2NF.',
      'What are ACID properties?',
      'Explain SQL joins with examples.'
    ],
    os: [
      'What is process synchronization?',
      'What is a deadlock and Banker\'s algorithm?',
      'Explain process management and PCB.'
    ],
    gaps: [
      'What are my weak topics?',
      'How can I fix my Polymorphism gap?',
      'What should I study today?'
    ]
  };

  const activeQuestions = categoryQuestions[selectedCategory] || categoryQuestions.all;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isThinking) return;
    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  const handleQuickQuestionClick = (q: string) => {
    if (isThinking) return;
    onSendMessage(q);
  };

  // Helper to format text with markdown-like highlights and code snippets
  const renderMessageContent = (text: string) => {
    // Check if contains code block ```
    if (text.includes('```')) {
      const parts = text.split(/```(?:cpp|sql|)/g);
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <pre key={index} className="my-2 p-3 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
              <code>{part.trim()}</code>
            </pre>
          );
        }
        return (
          <p key={index} className="whitespace-pre-line leading-relaxed">
            {part}
          </p>
        );
      });
    }

    return <p className="whitespace-pre-line leading-relaxed">{text}</p>;
  };

  return (
    <div id="ask-medha-ai-view" className="space-y-4 pb-8 flex flex-col h-[calc(100vh-140px)]">
      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Ask Medha AI
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              Adaptive Tutor Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Your personal learning assistant. Ask any conceptual question, get instant clear explanations, and bridge connected learning gaps.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onClearChat && messages.length > 1 && (
            <button
              onClick={onClearChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              title="Reset conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Chat</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ready</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col flex-1 overflow-hidden">
        {/* Category Pills & Quick Questions */}
        <div className="bg-slate-50/90 border-b border-slate-200/80 p-3 space-y-2 shrink-0">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Subject:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto pt-0.5 scrollbar-none">
            <span className="text-xs font-medium text-slate-500 shrink-0 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
              Suggested:
            </span>
            {activeQuestions.map((q, idx) => (
              <button
                key={idx}
                id={`quick-q-${idx}`}
                disabled={isThinking}
                onClick={() => handleQuickQuestionClick(q)}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 text-slate-700 border border-slate-200/90 shadow-2xs transition-all shrink-0 cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                id={`chat-msg-${msg.id}`}
                className={`flex gap-3 max-w-3xl ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    isAi 
                      ? 'bg-gradient-to-tr from-indigo-600 via-blue-600 to-teal-500 text-white' 
                      : 'bg-slate-800 text-slate-200'
                  }`}
                >
                  {isAi ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-2.5 max-w-2xl">
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      isAi
                        ? 'bg-slate-50 border border-slate-200/90 text-slate-800 shadow-2xs'
                        : 'bg-indigo-600 text-white font-medium shadow-xs'
                    }`}
                  >
                    {renderMessageContent(msg.text)}
                  </div>

                  {/* Learning Insight Card */}
                  {isAi && msg.learningInsight && (
                    <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs space-y-2.5 shadow-2xs">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-400" />
                        <span>💡 Medha Learning Insight</span>
                      </div>
                      <p className="text-amber-900 leading-relaxed font-medium">
                        {msg.learningInsight}
                      </p>

                      {msg.actionLabel && (
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-amber-200/60">
                          <button
                            id={`btn-add-learning-path-${msg.id}`}
                            onClick={() => onAddToLearningPath(msg.relatedTopicTitle || 'Polymorphism', msg.id)}
                            disabled={msg.actionAdded}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              msg.actionAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                            }`}
                          >
                            {msg.actionAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                <span>Added to Learning Path</span>
                              </>
                            ) : (
                              <>
                                <PlusCircle className="w-3.5 h-3.5" />
                                <span>{msg.actionLabel}</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={onNavigateToLearningPath}
                            className="text-xs font-semibold text-indigo-700 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>View in Path</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 block px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Thinking Animation */}
          {isThinking && (
            <div className="flex gap-3 max-w-2xl mr-auto animate-fadeIn">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-2xs flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" />
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Medha AI is analyzing concept &amp; learning path prerequisites...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* User Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2 sm:gap-3 shrink-0"
        >
          <input
            ref={inputRef}
            id="chat-input-field"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isThinking}
            placeholder="Ask Medha AI any doubt (e.g. 'What is polymorphism?', 'Explain normalization', 'What are my weak topics?')..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-2xs disabled:opacity-60"
          />
          <button
            id="btn-send-message"
            type="submit"
            disabled={!inputValue.trim() || isThinking}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
