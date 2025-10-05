import React from 'react';
import { useQuestionStore, useTestStore } from '../store/useTestStore';

export const SubmitModal: React.FC = () => {
  const { questions } = useQuestionStore()
  const { answers, setShowSubmitModal } = useTestStore()

  const confirmSubmit = () => {
    setShowSubmitModal(false);
  };

  const attemptedCount = (): number => {
    return Object.keys(answers).length;
  };


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Quiz Summary</h2>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg text-center">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Questions</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{questions.length}</p>
          </div>
          <div className="bg-green-50 p-3 sm:p-4 rounded-lg text-center">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Attempted</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{attemptedCount()}</p>
          </div>
          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg text-center">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Unattempted</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-600">
              {questions.length - attemptedCount()}
            </p>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Question Status</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className={`p-2 sm:p-3 rounded-lg text-center font-semibold text-xs sm:text-sm ${answers[q.id] !== undefined
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => setShowSubmitModal(false)}
            className="flex-1 px-4 sm:px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 text-sm sm:text-base"
          >
            Review Answers
          </button>
          <button
            onClick={confirmSubmit}
            className="flex-1 px-4 sm:px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 text-sm sm:text-base"
          >
            Confirm Submit
          </button>
        </div>
      </div>
    </div>
  );
};
