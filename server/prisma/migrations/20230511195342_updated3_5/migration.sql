-- DropForeignKey
ALTER TABLE "Parents" DROP CONSTRAINT "Parents_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Teachers" DROP CONSTRAINT "Teachers_subject_id_fkey";

-- AddForeignKey
ALTER TABLE "Teachers" ADD CONSTRAINT "Teachers_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Parents" ADD CONSTRAINT "Parents_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
