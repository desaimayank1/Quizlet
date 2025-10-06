import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuestionStore, useTestStore, useUserStore } from '../store/useTestStore';
import { handleRetake } from '../lib/utils';


export const AnalysisPage: React.FC = () => {
  const { questions, setQuestions } = useQuestionStore()
  const { userEmail, userName } = useUserStore()
  const { answers, resetAnswers, setCurrentQuestion } = useTestStore()
  const navigate = useNavigate()
  const onRetake = () => handleRetake(userEmail, userName, navigate, resetAnswers, setQuestions, setCurrentQuestion)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Question Analysis</h1>
          <p className="text-sm sm:text-base text-gray-600">Review your answers and correct solutions</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {questions.map((question, qIndex) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            const isAttempted = userAnswer !== undefined;

            return (
              <div key={question.id} className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2 sm:gap-0">
                  <h3 className="text-base sm:text-xl font-semibold text-gray-800 flex-1">
                    {qIndex + 1}. {question.text}
                  </h3>
                  <div className="sm:ml-4">
                    {!isAttempted ? (
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-gray-200 text-gray-700">
                        <AlertCircle size={14} className="mr-1" />
                        Not Attempted
                      </span>
                    ) : isCorrect ? (
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-green-100 text-green-800">
                        <CheckCircle size={14} className="mr-1" />
                        Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-red-100 text-red-800">
                        <XCircle size={14} className="mr-1" />
                        Incorrect
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {question.options.map((option, oIndex) => {
                    const isUserAnswer = userAnswer === oIndex;
                    const isCorrectAnswer = question.correctAnswer === oIndex;

                    return (
                      <div
                        key={oIndex}
                        className={`p-3 sm:p-4 rounded-lg border-2 ${isCorrectAnswer
                            ? 'border-green-500 bg-green-50'
                            : isUserAnswer
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-sm sm:text-base text-gray-800">{option}</span>
                          <div className="flex items-center gap-2">
                            {isUserAnswer && !isCorrectAnswer && (
                              <span className="text-xs sm:text-sm font-semibold text-red-600">
                                Your Answer
                              </span>
                            )}
                            {isCorrectAnswer && (
                              <span className="text-xs sm:text-sm font-semibold text-green-600">
                                Correct Answer
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => { navigate("/result") }}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 text-sm sm:text-base"
          >
            Back to Results
          </button>
          <button
            onClick={onRetake}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 text-sm sm:text-base"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
