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
git clone https://github.com/desaimayank1/Quizlet.git
cd Quizlet
```

The repository structure will look like this:
```bash
Quizlet/
├── backend/        # Node.js backend code
├── frontend/       # React frontend code
├── README.md
```

2. Install dependencies
```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```

3. Set up the database
```bash
cd ../backend
npx prisma migrate dev --name new
```

4. Run the application
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
# Runs the frontend at http://localhost:5173.
```

5. Run tests
```bash
cd backend
npm test
```

[Watch the Demo on Loom](https://www.loom.com/share/a459e87639dc4acd99b0f0424efe7c16?sid=406cdff4-968e-4e93-9328-02406da69608)


