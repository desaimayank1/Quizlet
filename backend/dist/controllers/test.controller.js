"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beginQuiz = void 0;
const client_1 = require("@prisma/client");
const beginQuiz = async (req, res) => {
    const { email, name } = req.query;
    if (!email || !name) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const prisma = new client_1.PrismaClient();
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });
        const question = await prisma.question.findMany();
        console.log(question);
        if (user === null) {
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    testStatus: false,
                },
            });
            return res.status(201).json({
                success: true,
                userExists: false,
                newUser,
                message: "New user created. You can start the quiz.",
            });
        }
        else {
            return res.status(201).json({
                success: true,
                userExists: true,
                user,
                message: "User Already exist",
            });
        }
    }
    catch (error) {
        console.log("Error to begin Quiz", error);
    }
};
exports.beginQuiz = beginQuiz;
