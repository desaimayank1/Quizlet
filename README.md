# Online Quiz Application

## Project Description
This is a full-stack **Online Quiz Application** where users can take quizzes, view their scores, analyze their results, and retake the quiz if needed. 
Users can participate in quizzes using their email and get detailed feedback on their performance.  

The project is built using **React** for the frontend, **Node.js** for the backend, and **SQLite** with **Prisma ORM** for database management. 
State management on the frontend is handled using **Zustand**.  

---

## Project Setup

### 1. Clone the repository
```bash
git clone <your-repo-link>
cd <repo-folder>

# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install

cd ../backend
npx prisma migrate dev --name new

# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev

# Run testcases 
cd backend
npm test
