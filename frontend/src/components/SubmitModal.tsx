import React from 'react';
import { useQuestionStore, useTestStore, useUserStore } from '../store/useTestStore';
import { useNavigate } from 'react-router-dom';
import { confirmSubmit } from '../lib/utils';

export const SubmitModal: React.FC = () => {
  const { questions, setScore, setQuestions } = useQuestionStore();
  const { userId } = useUserStore();
  const { answers, setShowSubmitModal, setTimeLeft } = useTestStore();
  const navigate = useNavigate();

  const handleSubmit = () =>
    confirmSubmit(userId, answers, setScore, questions, setQuestions, setShowSubmitModal, setTimeLeft, navigate);

  const attemptedCount = (): number => Object.keys(answers).length;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Quiz Summary
        </h2>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-4 text-center shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Questions</p>
            <p className="text-3xl font-bold text-indigo-600">{questions.length}</p>
          </div>
          <div className="rounded-xl bg-green-50 border border-green-100 p-4 text-center shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Attempted</p>
            <p className="text-3xl font-bold text-green-600">{attemptedCount()}</p>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Unattempted</p>
            <p className="text-3xl font-bold text-gray-700">
              {questions.length - attemptedCount()}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-3 text-base">Question Status</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className={`rounded-lg text-center font-medium text-sm sm:text-base py-2 border transition-colors
                  ${answers[q.id] !== undefined
                    ? 'bg-green-100 border-green-200 text-green-800'
                    : 'bg-gray-100 border-gray-200 text-gray-600'
                  }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setShowSubmitModal(false)}
            className="flex-1 px-6 py-3 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-200 border border-gray-200 transition-colors"
          >
            Review Answers
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 shadow-md"
          >
            Confirm Submit
          </button>
        </div>
      </div>
    </div>
  );
};
