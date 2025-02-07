/*
  Warnings:

  - A unique constraint covering the columns `[User_phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_User_email_idx";

-- CreateIndex
CREATE UNIQUE INDEX "User_User_phoneNumber_key" ON "User"("User_phoneNumber");

-- CreateIndex
CREATE INDEX "User_User_email_User_phoneNumber_User_dni_idx" ON "User"("User_email", "User_phoneNumber", "User_dni");
