import { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  TrendingUp, 
  Award,
  BookOpen
} from 'lucide-react';
import { Topic } from '../types';

interface InteractiveLessonModalProps {
  topic: Topic | null;
  onClose: () => void;
  onLessonCompleted: (topicId: string, newMastery: number) => void;
}

export function InteractiveLessonModal({
  topic,
  onClose,
  onLessonCompleted
}: InteractiveLessonModalProps) {
  if (!topic) return null;

  const [currentStep, setCurrentStep] = useState<'explanation' | 'quiz' | 'completed'>('explanation');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const questions = [
    {
      question: '1. Which C++ keyword forces late (runtime) binding for a member function?',
      options: ['static', 'virtual', 'override', 'inline'],
      correctIndex: 1,
      explanation: 'The `virtual` keyword instructs the compiler to generate a vtable and resolve calls at runtime based on the actual object type.'
    },
    {
      question: '2. In Method Overriding, what must be identical between base and derived classes?',
      options: [
        'Only the return type',
        'The method name, parameter list, and return type (exact signature)',
        'Only the method name (parameters can vary)',
        'The access modifier (public/private)'
      ],
      correctIndex: 1,
      explanation: 'Overriding requires exact signature identity. If parameters differ, it becomes function hiding or overloading.'
    },
    {
      question: '3. Can a class constructor in C++ be declared as `virtual`?',
      options: [
        'Yes, always recommended',
        'No, constructors cannot be virtual because the vtable is not yet initialized',
        'Yes, only in abstract classes',
        'Yes, if destructor is also virtual'
      ],
      correctIndex: 1,
      explanation: 'Constructors construct the vtable pointer and object memory; hence they cannot be virtual.'
    }
  ];

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleFinishQuiz = () => {
    setQuizSubmitted(true);
    const score = calculateScore();
    // Simulate adaptive jump from 52% to 76% (or weighted by score)
    const newMastery = Math.min(95, Math.max(68, Math.round(52 + (score * 0.28))));
    setCurrentStep('completed');
    onLessonCompleted(topic.id, newMastery);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        id="interactive-lesson-modal"
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-indigo-50/40">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-100/80 px-2.5 py-0.5 rounded-full border border-indigo-200">
                <Sparkles className="w-3 h-3 text-indigo-600" />
                Adaptive Gap Bridge Lesson
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {topic.subject}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Recommended Lesson: {topic.title}
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
        <div className="p-6 overflow-y-auto space-y-6">
          {/* STEP 1: Micro Explanation */}
          {currentStep === 'explanation' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block mb-0.5">Targeted Diagnostic Gap:</strong>
                  <span>
                    Your previous quiz showed 52% mastery due to confusion between compile-time overloading and runtime method overriding.
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Micro-Lesson: Runtime Dynamic Dispatch in C++
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Runtime polymorphism allows a base class pointer or reference to invoke the derived class method at runtime. This requires:
                </p>
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-1.5 mt-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <li>Declaring the method as <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-indigo-700">virtual</code> in the Base class.</li>
                  <li>Providing an identical signature implementation in the Derived class.</li>
                  <li>The compiler injects a <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-indigo-700">vptr</code> pointing to the class <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-indigo-700">vtable</code>.</li>
                </ul>
              </div>

              {/* Code snippet */}
              <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
                <span className="text-slate-500">// C++ Runtime Polymorphism Example</span><br />
                <span className="text-purple-400">class</span> <span className="text-yellow-300">Base</span> {'{'}<br />
                &nbsp;&nbsp;<span className="text-purple-400">public</span>:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">virtual void</span> <span className="text-blue-400">show</span>() {'{' } cout &lt;&lt; <span className="text-emerald-400">"Base"</span>; {'}'}<br />
                {'};'}<br />
                <span className="text-purple-400">class</span> <span className="text-yellow-300">Derived</span> : <span className="text-purple-400">public</span> Base {'{'}<br />
                &nbsp;&nbsp;<span className="text-purple-400">public</span>:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">void</span> <span className="text-blue-400">show</span>() <span className="text-teal-400">override</span> {'{'} cout &lt;&lt; <span className="text-emerald-400">"Derived"</span>; {'}'}<br />
                {'};'}
              </div>

              <div className="pt-2">
                <button
                  id="btn-proceed-to-quiz"
                  onClick={() => setCurrentStep('quiz')}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
                >
                  <span>Practice 3 Checkpoint Questions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Practice 3 Questions */}
          {currentStep === 'quiz' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span>Checkpoint Diagnostic (3 Questions)</span>
                <span className="font-semibold text-indigo-600">
                  {Object.keys(selectedAnswers).length} / 3 Answered
                </span>
              </div>

              <div className="space-y-5">
                {questions.map((q, qIdx) => (
                  <div key={qIdx} className="space-y-2.5">
                    <p className="text-sm font-semibold text-slate-900">{q.question}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[qIdx] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(qIdx, optIdx)}
                            className={`p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold ring-1 ring-indigo-500'
                                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span className="inline-block w-5 h-5 rounded-full border text-center leading-4 text-[10px] mr-2 text-slate-500 bg-slate-100">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => setCurrentStep('explanation')}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Back to Explanation
                </button>
                <button
                  id="btn-submit-diagnostic-quiz"
                  onClick={handleFinishQuiz}
                  disabled={Object.keys(selectedAnswers).length < 3}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Submit & Recalculate Mastery
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Completed & Recalculated */}
          {currentStep === 'completed' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Adaptive Bridge Activated!
                </span>
                <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Polymorphism Mastery Upgraded!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                  Medha AI analyzed your drill responses. Prerequisite Method Overriding gap has been bridged.
                </p>
              </div>

              {/* Live Adaptive Metric Update */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 max-w-sm mx-auto flex items-center justify-around">
                <div>
                  <span className="text-[11px] text-slate-500 block">Previous Mastery</span>
                  <span className="text-lg font-bold text-amber-600">52%</span>
                  <span className="text-[10px] text-amber-700 block">Needs Improvement</span>
                </div>
                <div className="text-indigo-600">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Updated Mastery</span>
                  <span className="text-lg font-bold text-emerald-600">76%</span>
                  <span className="text-[10px] text-emerald-700 block">Learning Status</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  id="btn-close-lesson-modal"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Return to Learning Path
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
