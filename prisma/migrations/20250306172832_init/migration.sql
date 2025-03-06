/*
  Warnings:

  - You are about to drop the column `Mov_relatedId` on the `StockMovement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StockMovement" DROP COLUMN "Mov_relatedId",
ADD COLUMN     "Mov_proId" INTEGER,
ADD COLUMN     "Mov_saleId" INTEGER;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_Mov_proId_fkey" FOREIGN KEY ("Mov_proId") REFERENCES "Procurement"("Pro_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_Mov_saleId_fkey" FOREIGN KEY ("Mov_saleId") REFERENCES "Sale"("Sale_id") ON DELETE SET NULL ON UPDATE CASCADE;
