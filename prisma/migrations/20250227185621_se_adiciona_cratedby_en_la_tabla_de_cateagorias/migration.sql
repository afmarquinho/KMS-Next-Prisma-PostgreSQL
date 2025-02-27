/*
  Warnings:

  - Added the required column `Cat_createdBy` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "Cat_createdBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_Cat_createdBy_fkey" FOREIGN KEY ("Cat_createdBy") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;
