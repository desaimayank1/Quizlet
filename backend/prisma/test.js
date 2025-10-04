// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function main() {
//   const questions = [
//   {
//     text: "Which language is primarily used for web development on the client side?",
//     options: JSON.stringify(["Python", "JavaScript", "C++", "Java"]),
//     answer: 1,
//   },
//   {
//     text: "What does CSS stand for?",
//     options: JSON.stringify(["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Syntax", "Colorful Style Sheets"]),
//     answer: 0,
//   },
//   {
//     text: "Which of these is a NoSQL database?",
//     options: JSON.stringify(["MySQL", "MongoDB", "PostgreSQL", "SQLite"]),
//     answer: 1,
//   },
//   {
//     text: "In JavaScript, which method is used to parse a JSON string into an object?",
//     options: JSON.stringify(["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.toObject()"]),
//     answer: 1,
//   },
//   {
//     text: "What does REST stand for in web development?",
//     options: JSON.stringify(["Representational State Transfer", "Rapid Event System Transfer", "Remote Execution Service Technology", "Real-time Server Transfer"]),
//     answer: 0,
//   },
//   {
//     text: "Which Git command is used to upload your local commits to a remote repository?",
//     options: JSON.stringify(["git commit", "git push", "git pull", "git merge"]),
//     answer: 1,
//   },
//   {
//     text: "Which of these is a frontend JavaScript framework?",
//     options: JSON.stringify(["Express.js", "Django", "React", "Flask"]),
//     answer: 2,
//   },
//   {
//     text: "What is the time complexity of searching for an element in a balanced binary search tree?",
//     options: JSON.stringify(["O(1)", "O(log n)", "O(n)", "O(n log n)"]),
//     answer: 1,
//   },
// ];


//   for (const q of questions) {
//     await prisma.question.create({
//       data: q,
//     });
//   }

//   console.log("Questions inserted successfully!");
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllQuestions() {
  const questions = await prisma.question.findMany();

  // Parse options from JSON string
  const formattedQuestions = questions.map(q => ({
    id: q.id,
    text: q.text,
    options: JSON.parse(q.options), // convert string back to array
    answer: q.answer,
  }));

  console.log(formattedQuestions);
  return formattedQuestions;
}

getAllQuestions()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

