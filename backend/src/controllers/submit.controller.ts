import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";

export const submitQuiz = async (req: Request, res: Response) => {
    const { user, answers } = req.body
    const prisma = new PrismaClient();

    // await prisma.quiz.deleteMany()  

    // const Quiz = await prisma.quiz.findMany()

    // console.log("Quiz",Quiz)

    try {
        
        const questions = await prisma.question.findMany();

        let score = 0;
        answers.forEach(ans => {
            questions.forEach(ques => {
                if (ans.questionId === ques.id && ans.selectedOption === ques.answer) {
                    score = score + 1;
                }
            })
        });

        const Quiz = await prisma.quiz.create({
            data: {
                user: { connect: { id: user.id } },
                score: score,
                answers: {
                    create: answers.map(ans => ({
                        questionId: ans.questionId,
                        selectedAns: ans.selectedOption
                    }))
                },
                
            },
             include: { answers: true }
        });

        console.log("Quiz",Quiz)

        res.status(200).json({
            score,
            Quiz,
        })

    } catch (error) {
        console.log("Error submitting",error)
    }
}