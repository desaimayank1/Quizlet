import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useQuestionStore, useTestStore, useUserStore } from '../store/useTestStore';
import { useNavigate } from 'react-router-dom';
import { handleRetake } from '../lib/utils';

export const ResultPage: React.FC = () => {
  const { score, questions, setQuestions } = useQuestionStore();
  const { userEmail, userName } = useUserStore();
  const { answers, resetAnswers, setCurrentQuestion } = useTestStore();
  const totalQuestions = questions.length;
  const percentage = (score / totalQuestions) * 100;
  const navigate = useNavigate();

  const handleOnAnalysis = () => navigate("/analysis");
  const onRetake = () => handleRetake(userEmail, userName, navigate, resetAnswers, setQuestions, setCurrentQuestion);
  const attemptedCount = (): number => Object.keys(answers).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50 px-4 py-8">
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-2xl flex flex-col justify-between p-6 sm:p-8 md:p-10">

        <div className="text-center mb-6 sm:mb-8">
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center rounded-full shadow-sm mb-4 ${percentage >= 70
                ? 'bg-green-50 text-green-600'
                : percentage >= 20
                  ? 'bg-yellow-50 text-yellow-600'
                  : 'bg-red-50 text-red-600'
              }`}
          >
            <CheckCircle size={40} className="sm:w-10 sm:h-10" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Quiz Completed!</h1>
          <p className="text-gray-500 text-sm sm:text-base">Here are your results summary</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-6 sm:mb-8">
          <div className="text-center">
            <p className="text-gray-500 text-xs sm:text-sm mb-1">Your Score</p>
            <p className="text-4xl sm:text-5xl font-extrabold text-indigo-600">{score}/{totalQuestions}</p>
          </div>
          <div className="hidden sm:block h-10 w-[1px] bg-gray-200" />
          <div className="text-center">
            <p className="text-gray-500 text-xs sm:text-sm mb-1">Percentage</p>
            <p className="text-4xl sm:text-5xl font-extrabold text-blue-600">{percentage.toFixed(0)}%</p>
          </div>
        </div>

        <div className="border-t border-gray-100 my-3 sm:my-4" />

        <div className="text-gray-700 text-sm sm:text-base space-y-2 sm:space-y-3">
          <div className="flex justify-between bg-gray-100 rounded-2xl px-3 items-center py-1 sm:py-2">
            <span>Correct Answers</span>
            <span className="font-semibold text-green-600">{score}</span>
          </div>
          <div className="flex justify-between bg-gray-100 rounded-2xl px-3 items-center py-1 sm:py-2">
            <span>Wrong Answers</span>
            <span className="font-semibold  text-red-600">{attemptedCount() - score}</span>
          </div>
          <div className="flex justify-between bg-gray-100 rounded-2xl px-3 items-center py-1 sm:py-2">
            <span>Unattempted</span>
            <span className="font-semibold text-gray-600">
              {totalQuestions - attemptedCount()}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100 my-4" />

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            onClick={handleOnAnalysis}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-sm sm:text-base transition-all shadow-sm hover:shadow-md"
          >
            Analyze Questions
          </button>
          <button
            onClick={onRetake}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all shadow-sm hover:shadow-md"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
