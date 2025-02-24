/*
  Warnings:

  - You are about to drop the column `Pro_supplierId` on the `Procurement` table. All the data in the column will be lost.
  - Added the required column `Pro_suppId` to the `Procurement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Procurement" DROP CONSTRAINT "Procurement_Pro_supplierId_fkey";

-- AlterTable
ALTER TABLE "Procurement" DROP COLUMN "Pro_supplierId",
ADD COLUMN     "Pro_suppId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Procurement" ADD CONSTRAINT "Procurement_Pro_suppId_fkey" FOREIGN KEY ("Pro_suppId") REFERENCES "Supplier"("Supp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
