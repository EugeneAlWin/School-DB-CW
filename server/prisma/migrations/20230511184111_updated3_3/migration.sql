-- DropForeignKey
ALTER TABLE "Grades" DROP CONSTRAINT "Grades_teacher_id_fkey";

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
