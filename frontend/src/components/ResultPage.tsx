import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useQuestionStore,useTestStore } from '../store/useTestStore';
import { useNavigate } from 'react-router-dom';
import { handleRetake } from '../lib/utils';

export const ResultPage: React.FC = () => {
  const { score, questions } = useQuestionStore()
  const { answers } = useTestStore()
  const totalQuestions = questions.length
  const percentage = (score / totalQuestions) * 100;
  const navigate = useNavigate()


  const handleOnAnalysis = () => {
    navigate("/");
  };

 const attemptedCount = (): number => {
    return Object.keys(answers).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-2xl w-full">
        <div className="text-center mb-6 sm:mb-8">
          <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${percentage >= 70 ? 'bg-green-100' : percentage >= 40 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
            {percentage >= 70 ? (
              <CheckCircle className="text-green-600" size={40} />
            ) : (
              <AlertCircle className={percentage >= 40 ? 'text-yellow-600' : 'text-red-600'} size={40} />
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h1>
          <p className="text-sm sm:text-base text-gray-600">Here are your results</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-indigo-50 p-4 sm:p-6 rounded-lg text-center">
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Your Score</p>
            <p className="text-3xl sm:text-4xl font-bold text-indigo-600">
              {score}/{totalQuestions}
            </p>
          </div>
          <div className="bg-blue-50 p-4 sm:p-6 rounded-lg text-center">
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Percentage</p>
            <p className="text-3xl sm:text-4xl font-bold text-blue-600">{percentage.toFixed(0)}%</p>
          </div>
        </div>

        <div className="space-y-3 mb-6 sm:mb-8">
          <div className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
            <span className="text-sm sm:text-base text-gray-700">Correct Answers</span>
            <span className="font-bold text-green-600 text-sm sm:text-base">{score}</span>
          </div>
          <div className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
            <span className="text-sm sm:text-base text-gray-700">Wrong Answers</span>
            <span className="font-bold text-red-600 text-sm sm:text-base">
              {attemptedCount() - score}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
            <span className="text-sm sm:text-base text-gray-700">Unattempted</span>
            <span className="font-bold text-gray-600 text-sm sm:text-base">
              {totalQuestions - attemptedCount()}
            </span>
          </div>
        </div>

        <button
          onClick={handleOnAnalysis}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 mb-3 sm:mb-4 text-sm sm:text-base"
        >
          Analyze Questions
        </button>

        <button
          onClick={handleRetake}
          className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 text-sm sm:text-base"
        >
          Take Another Quiz
        </button>
      </div>
    </div>
  );
};