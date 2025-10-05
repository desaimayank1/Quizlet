import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";

export const submitQuiz = async (req: Request, res: Response) => {
     let data;
    if (typeof req.body === 'string') {
       data = JSON.parse(req.body);
    }else{
       data = req.body;
    }
    const { user, answers } = data;
    console.log("hello",data)
    const prisma = new PrismaClient();

    // await prisma.quiz.deleteMany()  

    // const Quiz = await prisma.quiz.findMany()

    // console.log("Quiz",Quiz)

    try {

        const questions = await prisma.question.findMany();

        let score = 0;
        Object.entries(answers).forEach(([questionId, selectedOption]) => {
            const question = questions.find((q) => q.id === Number(questionId));
            if (question && selectedOption === question.answer) {
                score++;
            }
        });

        const Quiz = await prisma.quiz.create({
            data: {
                user: { connect: { id: user.id } },
                score: score,
                answers: {
                    create: Object.entries(answers).map(([questionId, selectedOption]) => ({
                        questionId: Number(questionId),
                        selectedAns: Number(selectedOption),
                    }))
                }
            },
            include: { answers: true }
        });

        console.log("Quiz", Quiz)

        res.status(200).json({
            score,
            Quiz,
            questions,
        })

    } catch (error) {
        console.log("Error submitting", error)
    }
}