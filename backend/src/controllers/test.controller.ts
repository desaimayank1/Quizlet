import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";


export const beginQuiz = async (req: Request, res: Response) => {
    const { email, name } = req.query;
    if (!email || !name) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const prisma = new PrismaClient();

    try {
        const user: User | null = await prisma.user.findUnique({
            where: { email: email as string },
            include:{
                quiz:true
            }
        });
        

        const questions = await prisma.question.findMany({
            select: {
                id: true,
                text: true,
                options: true,
            }
        });
        // console.log(questions);
        // await prisma.user.deleteMany();
        const user1 = await prisma.user.findMany()
        const quiz1 = await prisma.quiz.findMany()
        console.log(user1);
        console.log(quiz1);

        if (user === null) {
            const newUser = await prisma.user.create({
                data: {
                    email: email as string,
                    name: name as string,
                    testStatus: false,
                },
            });

            return res.status(201).json({
                success: true,
                userExists: false,
                user:newUser,
                questions,
                message: "New user created. You can start the quiz.",
            });
        } else {

            return res.status(201).json({
                success: true,
                userExists: true,
                user,
                questions,
                message: "User Already exist",
            })
        }

    } catch (error) {
        console.log("Error to begin Quiz", error);

    }
}

export const retakeQuiz = async (req: Request, res: Response) => {
    const { email, name } = req.query;

    if (!email || !name) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const prisma = new PrismaClient();

    try {

        await prisma.user.update({
            where: {
                email: email as string
            },
            data: {
                quiz: {
                    delete: true
                }
            }
        })

        const questions = prisma.question.findMany();

        return res.status(201).json({
            success: true,
            questions,
            message: "New user created. You can start the quiz.",
        });

    } catch (error) {

    }
}