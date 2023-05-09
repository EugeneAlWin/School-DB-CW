/*
  Warnings:

  - You are about to drop the column `studentId` on the `Grades` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Grades` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Grades` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Parents` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Parents` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Parents` table. All the data in the column will be lost.
  - You are about to drop the column `imgPath` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Teachers` table. All the data in the column will be lost.
  - You are about to drop the column `imgPath` on the `Teachers` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Teachers` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Teachers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Teachers` table. All the data in the column will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Parents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `student_id` to the `Grades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_id` to the `Grades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `Grades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_id` to the `Teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Teachers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Grades" DROP CONSTRAINT "Grades_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Grades" DROP CONSTRAINT "Grades_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Grades" DROP CONSTRAINT "Grades_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Parents" DROP CONSTRAINT "Parents_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Parents" DROP CONSTRAINT "Parents_userId_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_userId_fkey";

-- DropForeignKey
ALTER TABLE "Teachers" DROP CONSTRAINT "Teachers_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Teachers" DROP CONSTRAINT "Teachers_userId_fkey";

-- DropIndex
DROP INDEX "Grades_studentId_key";

-- DropIndex
DROP INDEX "Grades_subjectId_key";

-- DropIndex
DROP INDEX "Grades_teacherId_key";

-- DropIndex
DROP INDEX "Parents_studentId_key";

-- DropIndex
DROP INDEX "Parents_userId_key";

-- DropIndex
DROP INDEX "Students_userId_key";

-- DropIndex
DROP INDEX "Teachers_subjectId_key";

-- DropIndex
DROP INDEX "Teachers_userId_key";

-- AlterTable
ALTER TABLE "Grades" DROP COLUMN "studentId",
DROP COLUMN "subjectId",
DROP COLUMN "teacherId",
ADD COLUMN     "student_id" INTEGER NOT NULL,
ADD COLUMN     "subject_id" INTEGER NOT NULL,
ADD COLUMN     "teacher_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Parents" DROP COLUMN "lastName",
DROP COLUMN "studentId",
DROP COLUMN "userId",
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "student_id" INTEGER NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Students" DROP COLUMN "imgPath",
DROP COLUMN "lastName",
DROP COLUMN "userId",
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Teachers" DROP COLUMN "description",
DROP COLUMN "imgPath",
DROP COLUMN "lastName",
DROP COLUMN "subjectId",
DROP COLUMN "userId",
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "subject_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Subject";

-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subjects" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Subjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_user_id_key" ON "Admins"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subjects_title_key" ON "Subjects"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Parents_user_id_key" ON "Parents"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Students_user_id_key" ON "Students"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Teachers_user_id_key" ON "Teachers"("user_id");

-- AddForeignKey
ALTER TABLE "Teachers" ADD CONSTRAINT "Teachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teachers" ADD CONSTRAINT "Teachers_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parents" ADD CONSTRAINT "Parents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parents" ADD CONSTRAINT "Parents_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
