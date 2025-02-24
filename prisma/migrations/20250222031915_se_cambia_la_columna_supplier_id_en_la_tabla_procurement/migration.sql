/*
  Warnings:

  - You are about to drop the column `Pro_description` on the `Procurement` table. All the data in the column will be lost.
  - Added the required column `Pro_desc` to the `Procurement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Procurement" DROP COLUMN "Pro_description",
ADD COLUMN     "Pro_desc" TEXT NOT NULL;
