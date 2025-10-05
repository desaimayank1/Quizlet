import { CheckCircle, RotateCcw } from 'lucide-react';
import { useUserStore, useQuestionStore,useTestStore } from '../store/useTestStore';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleRetake } from '../lib/utils';

export const StartPage: React.FC = () => {
    const { userEmail, userName, setUserEmail, setUserName,setUserId } = useUserStore();
    const { setQuestions,setScore ,score,questions} = useQuestionStore()
    const { resetAnswers} = useTestStore()
    const [showResult, setShowResult] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (userEmail && userName) {
            try {
                const response = await axios.get("http://localhost:3000/test/user-info", {
                    params: {
                        email: userEmail,
                        name: userName,
                    },
                });

                const data = response.data;
                setUserId(data.user.id)

                const questionsArray = data.questions.map((q:any) => ({
                    ...q,
                    options: JSON.parse(q.options),
                }));
                setQuestions(questionsArray)
                console.log(data)
                if (data.userExists === true) {
                    setScore(data.user.quiz?.score)
                    setShowResult(true);
                } else {
                    navigate("/quiz");
                }

            } catch (error) {
                console.log("error fetching user", error);
            }
        }
    };

    const onRetake=()=> handleRetake(userEmail, userName, navigate,resetAnswers)

    return (
        <div className="min-h-screen w-full bg-gray-50 [background-image:radial-gradient(#c7d2fe_2px,transparent_2px)] [background-size:24px_24px] flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl  p-6 sm:p-12 flex flex-col justify-center min-h-[80vh]">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-15 h-15 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                        <CheckCircle className="text-white" size={30} />
                    </div>
                    <h1 className="text-3xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                        Online Quiz
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
                        Test your knowledge with our interactive, timed quiz challenge
                    </p>
                </div>

                {/* Body */}
                {!showResult ? (
                    <div className="flex-1 flex flex-col justify-center space-y-8">
                        {/* Form */}
                        <div className="grid gap-3">
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base shadow-sm"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base shadow-sm"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={!userEmail || !userName}
                                className="w-full bg-gradient-to-r mt-2 from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all text-lg shadow-md"
                            >
                                Verify & Start Test
                            </button>
                        </div>

                        {/* Quiz Info */}
                        <div className=" p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 shadow-inner">
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">
                                Quiz Details
                            </h3>
                            <ul className="text-base text-gray-700 space-y-2">
                                <li>✅ Total Questions: <span className="font-semibold">10</span></li>
                                <li>⏱️ Time Limit: <span className="font-semibold">10 minutes</span></li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="px-8 py-8 bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl text-center border border-green-200 shadow-xl">

                         
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-200 text-green-900 font-semibold mb-4 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Test Completed
                            </div>

                         
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Test already taken
                            </h2>

                         
                            <div className="flex flex-col items-center mb-6">
                                <p className="text-gray-700 font-medium text-lg mb-2">Your Score</p>
                                <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-tr from-green-300 to-emerald-500 text-white font-bold text-2xl shadow-md">
                                    {score}/{questions.length}
                                </div>
                            </div>

                    
                            <div className="flex flex-col sm:flex-row gap-4 justify-center"
                              onClick={onRetake}
                            >
                                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md text-lg">
                                    <RotateCcw size={20} />
                                    Retake Test
                                </button>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
};
