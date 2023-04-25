/*
  Warnings:

  - A unique constraint covering the columns `[subjectId]` on the table `Teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgPath` to the `Teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `Teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teachers" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "imgPath" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "subjectId" INTEGER NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grades" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "class" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "imgPath" TEXT NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parents" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Parents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Grades_studentId_key" ON "Grades"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Grades_teacherId_key" ON "Grades"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "Grades_subjectId_key" ON "Grades"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Students_userId_key" ON "Students"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Parents_userId_key" ON "Parents"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Parents_studentId_key" ON "Parents"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Teachers_subjectId_key" ON "Teachers"("subjectId");

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teachers" ADD CONSTRAINT "Teachers_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parents" ADD CONSTRAINT "Parents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parents" ADD CONSTRAINT "Parents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
