/*
  Warnings:

  - You are about to drop the column `answerOption` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `answers` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `quizId` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedAns` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionId" INTEGER NOT NULL,
    "selectedAns" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    CONSTRAINT "Answer_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Answer" ("id", "questionId") SELECT "id", "questionId" FROM "Answer";
DROP TABLE "Answer";
ALTER TABLE "new_Answer" RENAME TO "Answer";
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "answer" INTEGER NOT NULL
);
INSERT INTO "new_Question" ("id", "options", "text") SELECT "id", "options", "text" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_Quiz" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Quiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Quiz" ("id", "userId") SELECT "id", "userId" FROM "Quiz";
DROP TABLE "Quiz";
ALTER TABLE "new_Quiz" RENAME TO "Quiz";
CREATE UNIQUE INDEX "Quiz_userId_key" ON "Quiz"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
