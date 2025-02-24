/*
  Warnings:

  - You are about to drop the column `Item_description` on the `Item` table. All the data in the column will be lost.
  - Added the required column `Item_desc` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "Item_description",
ADD COLUMN     "Item_desc" TEXT NOT NULL;
