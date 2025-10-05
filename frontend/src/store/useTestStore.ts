import { create } from "zustand"
import type { Answers, Question } from "../types/data-types"

interface UserStore {
  userEmail: string
  userName: string
  setUserEmail: (email: string) => void
  setUserName: (name: string) => void

  userId: number | null
  setUserId: (id: number) => void
}

interface QuestionStore {
  questions: Question[] | []
  setQuestions: (questions: Question[]) => void

  score: number
  setScore: (score: number) => void
}

interface TestStore {
  currentQuestion: number
  setCurrentQuestion: (ques: number) => void

  answers: Answers;
  setAnswer: (questionId: number, selectedOption: number) => void;
  resetAnswers: () => void;

  timeLeft: number
  setTimeLeft: (time: number) => void

  showSubmitModal: boolean
  setShowSubmitModal: (status: boolean) => void
}

export const useUserStore = create<UserStore>((set) => ({
  userEmail: '',
  userName: '',
  setUserEmail: (email) => set(() => ({ userEmail: email })),
  setUserName: (name) => set(() => ({ userName: name })),

  userId: null,
  setUserId: (id) => set(() => ({ userId: id }))
}))


export const useQuestionStore = create<QuestionStore>((set) => ({
  questions: [],
  setQuestions: (ques) => set(() => ({ questions: ques })),

  score: 0,
  setScore: (score) => set(() => ({ score: score }))
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
  resetAnswers: () =>
    set({
      answers: {},
    }),

  timeLeft: 600,
  setTimeLeft: (time) => set(() => ({ timeLeft: time })),

  showSubmitModal: false,
  setShowSubmitModal: (status) => set(() => ({ showSubmitModal: status })),
}))
