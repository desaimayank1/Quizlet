import React, { useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuestionStore, useUserStore, useTestStore } from '../store/useTestStore';
import { SubmitModal } from './SubmitModal';
import { confirmSubmit } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const QuizPage: React.FC = () => {
  const { questions, setQuestions, setScore } = useQuestionStore();
  const { userName, userId } = useUserStore();
  const navigate = useNavigate();
  const { answers, setAnswer, currentQuestion, timeLeft, setCurrentQuestion, setShowSubmitModal, setTimeLeft, showSubmitModal } = useTestStore();

  useEffect(() => {
    if (location.pathname !== '/quiz' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      if (timeLeft <= 1) {
        handleAutoSubmit();
        return;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const user = { id: userId };
      const payload = JSON.stringify({ user, answers });
      navigator.sendBeacon(`${BACKEND_URL}/test/submit`, payload);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answers]);

  const handleAutoSubmit = () =>
    confirmSubmit(userId, answers, setScore, questions, setQuestions, setShowSubmitModal, setTimeLeft, navigate);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswer(questionId, answerIndex);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => setShowSubmitModal(true);
  const isLastQuestion = currentQuestion === questions.length - 1;

  if (!questions || questions.length === 0)
    return <div className="flex justify-center items-center min-h-screen text-gray-500 animate-pulse">Loading quiz...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex flex-col items-center py-6 px-4 sm:px-8 transition-colors">
      <div className="w-full max-w-4xl">

        <div className="bg-white/90 backdrop-blur-md shadow-lg border border-indigo-100 rounded-2xl p-5 sm:p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
              Question {currentQuestion + 1} <span className="text-gray-500 text-base">/ {questions.length}</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Participant: <span className="font-medium text-indigo-700">{userName}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl shadow-sm border border-indigo-100">
            <Clock className="text-indigo-600 w-5 h-5" />
            <span className="font-mono text-lg font-semibold text-indigo-700">{formatTime(timeLeft)}</span>
          </div>

        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-300 border border-gray-100">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 leading-snug">
            {questions[currentQuestion].text}
          </h3>

          <div className="flex flex-col gap-3 sm:gap-4">
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = answers[questions[currentQuestion].id] === index;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(questions[currentQuestion].id, index)}
                  className={`group w-full text-left rounded-xl border px-5 py-4 sm:py-5 transition-all duration-200 hover:scale-[1.02]
                    ${isSelected
                      ? 'border-indigo-600 bg-gradient-to-r from-indigo-50 to-indigo-100 ring-2 ring-indigo-200'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'}
                  `}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors duration-200
                        ${isSelected ? 'border-indigo-600 bg-indigo-600 shadow-inner' : 'border-gray-300'}
                      `}
                    >
                      {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                    </div>
                    <span className="text-gray-800 text-sm sm:text-base group-hover:text-indigo-700 transition-colors">
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl font-semibold bg-gray-200 text-gray-700 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="flex gap-1 sm:gap-2 flex-wrap justify-center bg-white/70 px-3 py-2 rounded-xl border border-gray-100 shadow-inner">
            {questions.map((q, index) => (
              <div
                key={index}
                title={`Question ${index + 1}`}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-200
                  ${answers[q.id] !== undefined
                    ? 'bg-indigo-600 shadow-sm shadow-indigo-400 scale-110'
                    : 'bg-gray-300'}
                `}
              ></div>
            ))}
          </div>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 shadow-md hover:shadow-lg transition-all"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {showSubmitModal && <SubmitModal />}
    </div>
  );
};
