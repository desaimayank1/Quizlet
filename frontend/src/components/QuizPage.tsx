import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useQuestionStore, useUserStore, useTestStore } from '../store/useTestStore';
import { SubmitModal } from './SubmitModal';
import { confirmSubmit } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const QuizPage: React.FC = () => {
  const { questions, setQuestions, setScore } = useQuestionStore()
  const { userName, userId } = useUserStore()
  const navigate = useNavigate()
  const { answers, setAnswer, currentQuestion, timeLeft, setCurrentQuestion, setShowSubmitModal, setTimeLeft, showSubmitModal } = useTestStore()

  useEffect(() => {
    if (location.pathname !== '/quiz' || timeLeft <= 0) return;

    const timer = setInterval(() => {
      if (timeLeft <= 1) {
        handleAutoSubmit();
        return 0;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft])

  useEffect(() => {
    const handleBeforeUnload = () => {
      const user = { id: userId }
      const payload = JSON.stringify({ user, answers });
      navigator.sendBeacon(`${BACKEND_URL}/test/submit`, payload);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answers]);

  const handleAutoSubmit = () => confirmSubmit(userId, answers, setScore, questions, setQuestions, setShowSubmitModal,setTimeLeft, navigate)

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswer(questionId, answerIndex);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    setShowSubmitModal(true);
  };

  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      {!questions || questions.length === 0 ?
        <div>Loading...</div>
        :
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-3 sm:mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">{userName}</p>
            </div>
            <div className="flex items-center gap-2 bg-red-50 px-3 sm:px-4 py-2 rounded-lg">
              <Clock className="text-red-600" size={18} />
              <span className="font-mono text-base sm:text-lg font-semibold text-red-600">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 mb-3 sm:mb-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
              {questions[currentQuestion].text}
            </h3>

            <div className="space-y-2 sm:space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(questions[currentQuestion].id, index)}
                  className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all ${answers[questions[currentQuestion].id] === index
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 ${answers[questions[currentQuestion].id] === index
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-gray-300'
                      }`}>
                      {answers[questions[currentQuestion].id] === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-sm sm:text-base md:text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Previous
            </button>

            <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${answers[q.id] !== undefined
                    ? 'bg-indigo-600'
                    : 'bg-gray-300'
                    }`}
                ></div>
              ))}
            </div>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 text-sm sm:text-base"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 text-sm sm:text-base"
              >
                Next
              </button>
            )}
          </div>
        </div>
      }
      {showSubmitModal && <SubmitModal />}
    </div>
  );
};