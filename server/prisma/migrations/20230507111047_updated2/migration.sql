-- AlterTable
ALTER TABLE "Admins" ALTER COLUMN "phone" SET DEFAULT '-';

-- AlterTable
ALTER TABLE "Parents" ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '-';

-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '-';

-- AlterTable
ALTER TABLE "Teachers" ALTER COLUMN "phone" SET DEFAULT '-';
