export interface User {
    id: number
    name: String
    email: String
    testStatus: Boolean
    quiz?: Quiz
}

export interface Quiz {
    id: number
    userId: number
    user: User
    answers: Answer[]
    score: number
}

export interface Answer {
    id: number
    questionId: number
    selectedAns: number
    quizId: number
    quiz: Quiz
}