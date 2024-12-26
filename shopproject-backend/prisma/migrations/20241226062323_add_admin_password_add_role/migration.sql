-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "AdminPassword" (
    "password" INTEGER NOT NULL DEFAULT 123456
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminPassword_password_key" ON "AdminPassword"("password");
