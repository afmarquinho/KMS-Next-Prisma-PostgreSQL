/*
  Warnings:

  - You are about to drop the column `Item_qtyReceive` on the `Item` table. All the data in the column will be lost.
  - Added the required column `Item_qtyReceived` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "Item_qtyReceive",
ADD COLUMN     "Item_qtyReceived" INTEGER NOT NULL;
