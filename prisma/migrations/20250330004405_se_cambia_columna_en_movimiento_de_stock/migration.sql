/*
  Warnings:

  - You are about to drop the column `Mov_userId` on the `StockMovement` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `StockMovement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StockMovement" DROP CONSTRAINT "StockMovement_Mov_userId_fkey";

-- AlterTable
ALTER TABLE "StockMovement" DROP COLUMN "Mov_userId",
ADD COLUMN     "createdBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;
