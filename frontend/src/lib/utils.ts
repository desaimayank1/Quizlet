// lib/utils.ts
import axios from "axios";
import type { Answers, Question } from "../types/data-types";
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const handleRetake = async (
  userEmail: string,
  userName: string,
  navigate: (path: string) => void,
  resetAnswers:()=>void
) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/test/retake`, {
      params: { email: userEmail, name: userName },
    });

    const data = response.data;
    if (data.success) {
      resetAnswers();
      navigate("/quiz");
    }
  } catch (error) {
    console.log("Error retaking", error);
  }
};

export const confirmSubmit = async (
   userId:number|null,
   answers:Answers,
   setScore:(score: number) => void,
   questions: [] | Question[],
   setQuestions:(questions: Question[]) => void,
   setShowSubmitModal:(status: boolean) => void,
   setTimeLeft:(time:number) => void,
   navigate: (path: string) => void,
) => {
    const user = {
      id: userId
    }

    const response = await axios.post(`${BACKEND_URL}/test/submit`, {
      user,
      answers
    });

    const data = response.data
    console.log(data);
    setScore(data.score)
    const updatedQuestions = questions.map((ques) => ({
      ...ques,
      correctAnswer: data.questions?.find((q: any) => q.id === ques.id)?.answer,
    }));

    setQuestions(updatedQuestions)
    setTimeLeft(600)
    setShowSubmitModal(false);
    navigate("/result")
  };
