import { calculateScore } from "../utils/score";

describe("calculateScore", () => {
    const questions = [
        {
            id: 1,
            text: 'Which language is primarily used for web development on the client side?',
            options: '["Python","JavaScript","C++","Java"]',
            answer: 1
        },
        {
            id: 2,
            text: 'What does CSS stand for?',
            options: '["Cascading Style Sheets","Computer Style Sheets","Creative Style Syntax","Colorful Style Sheets"]',
            answer: 0
        },
        {
            id: 3,
            text: 'Which of these is a NoSQL database?',
            options: '["MySQL","MongoDB","PostgreSQL","SQLite"]',
            answer: 1
        },
        {
            id: 4,
            text: 'In JavaScript, which method is used to parse a JSON string into an object?',
            options: '["JSON.stringify()","JSON.parse()","JSON.convert()","JSON.toObject()"]',
            answer: 1
        },
        {
            id: 5,
            text: 'What does REST stand for in web development?',
            options: '["Representational State Transfer","Rapid Event System Transfer","Remote Execution Service Technology","Real-time Server Transfer"]',
            answer: 0
        }
    ];

    it("should return full score when all answers are correct", () => {
        const answers = { '1': 1, '2': 0, '3': 1, '4': 1, '5': 0 };
        expect(calculateScore(questions, answers)).toBe(5);
    });

    it("should return 0 when all answers are wrong", () => {
        const answers = { '1': 0, '2': 1, '3': 0, '4': 0, '5': 1 };
        expect(calculateScore(questions, answers)).toBe(0);
    });

    it("should return correct score for some correct and some wrong answers", () => {
        const answers = { '1': 1, '2': 1, '3': 1, '4': 0, '5': 0 };
        expect(calculateScore(questions, answers)).toBe(3); // Q1, Q3, Q5 correct
    });

    it("should handle missing answers", () => {
        const answers = { '1': 1, '3': 1 }; // Only two questions answered
        expect(calculateScore(questions, answers)).toBe(2);
    });

    it("should handle answers as strings", () => {
        const answers = { '1': "1", '2': "0", '3': "1", '4': "1", '5': "0" }; // All correct
        expect(calculateScore(questions, answers)).toBe(5);
    });
});
