-- DropForeignKey
ALTER TABLE "Teachers" DROP CONSTRAINT "Teachers_subject_id_fkey";

-- AddForeignKey
ALTER TABLE "Teachers" ADD CONSTRAINT "Teachers_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
