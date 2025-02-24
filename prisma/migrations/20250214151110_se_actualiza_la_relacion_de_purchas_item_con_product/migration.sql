/*
  Warnings:

  - You are about to drop the column `Item_productId` on the `PurchaseItem` table. All the data in the column will be lost.
  - Added the required column `Product_itemId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PurchaseItem" DROP CONSTRAINT "PurchaseItem_Item_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "Product_itemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseItem" DROP COLUMN "Item_productId";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_Product_itemId_fkey" FOREIGN KEY ("Product_itemId") REFERENCES "PurchaseItem"("Item_id") ON DELETE RESTRICT ON UPDATE CASCADE;
