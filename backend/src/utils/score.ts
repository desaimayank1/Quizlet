
export type Question = {
    id: number,
    text: string,
    options: string,
    answer: number,
}


export const calculateScore = (questions: Question[], answers: any) => {
    let score = 0;
    Object.entries(answers).forEach(([questionId, selectedOption]) => {
        const question = questions.find(q => q.id === Number(questionId));
        if (question && Number(selectedOption) === Number(question.answer)) {
            score++;
        }
    });
    return score;
};
