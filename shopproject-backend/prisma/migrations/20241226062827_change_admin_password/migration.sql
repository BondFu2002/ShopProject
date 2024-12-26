-- AlterTable
ALTER TABLE "AdminPassword" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "AdminPassword_pkey" PRIMARY KEY ("id");
