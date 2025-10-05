import { create } from "zustand"
import type { Answers, Question } from "../types/data-types"

interface UserStore {
    userEmail: string
    userName: string
    setUserEmail: (email: string) => void
    setUserName: (name: string) => void
}

interface QuestionStore {
    questions: Question[] | []
    setQuestions: (questions: Question[]) => void
    score:number
    setScore:(score:number)=>void
}

interface TestStore {
    currentQuestion: number
    setCurrentQuestion: (ques:number) => void
    answers: Answers;
    setAnswer: (questionId: number, selectedOption: number) => void;
    timeLeft: number
    setTimeLeft: (time:number) => void
    showSubmitModal: boolean
    setShowSubmitModal: (status:boolean) => void
}

export const useUserStore = create<UserStore>((set) => ({
    userEmail: '',
    userName: '',
    setUserEmail: (email) => set(() => ({ userEmail: email })),
    setUserName: (name) => set(() => ({ userName: name })),
}))


export const useQuestionStore = create<QuestionStore>((set) => ({
    questions: [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1
  },
  {
    id: 4,
    text: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"],
    correctAnswer: 2
  },
  {
    id: 5,
    text: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: 3
  }
],
    setQuestions: (ques) => set(() => ({ questions: ques })),

    score:0,
    setScore:(score)=>set(()=>({score:score}))

}))

export const useTestStore = create<TestStore>((set) => ({
    currentQuestion: 0,
    setCurrentQuestion: (ques) => set(() => ({ currentQuestion: ques })),

    answers: {},
    setAnswer: (questionId, selectedOption) =>
        set((state) => ({
            answers: {
                ...state.answers,
                [questionId]: selectedOption,
            },
        })),

    timeLeft: 600,
    setTimeLeft: (time) => set(() => ({ timeLeft: time })),

    showSubmitModal: false,
    setShowSubmitModal: (status) => set(() => ({ showSubmitModal: status })),
}))
