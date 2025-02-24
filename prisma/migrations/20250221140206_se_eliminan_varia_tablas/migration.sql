/*
  Warnings:

  - You are about to drop the `BatchInventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Devolution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpenseSummary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InventoryRequests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProvisionRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SaleDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalesSummary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StockMovement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Warranty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BatchInventory" DROP CONSTRAINT "BatchInventory_Batch_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Devolution" DROP CONSTRAINT "Devolution_Dev_saleDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryRequests" DROP CONSTRAINT "InventoryRequests_Req_depId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryRequests" DROP CONSTRAINT "InventoryRequests_Req_prodId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_Product_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ProvisionRequest" DROP CONSTRAINT "ProvisionRequest_Prov_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProvisionRequest" DROP CONSTRAINT "ProvisionRequest_Prov_requestedBy_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_Purchase_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_Purchase_userId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseItem" DROP CONSTRAINT "PurchaseItem_Item_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseItem" DROP CONSTRAINT "PurchaseItem_Item_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseNote" DROP CONSTRAINT "PurchaseNote_Note_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseNote" DROP CONSTRAINT "PurchaseNote_Note_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_Sale_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_Sale_userId_fkey";

-- DropForeignKey
ALTER TABLE "SaleDetails" DROP CONSTRAINT "SaleDetails_SaleDetail_saleId_fkey";

-- DropForeignKey
ALTER TABLE "SaleDetails" DROP CONSTRAINT "SaleDetails_purchaseItemItem_id_fkey";

-- DropForeignKey
ALTER TABLE "SalesSummary" DROP CONSTRAINT "SalesSummary_SalesSumm_saleId_fkey";

-- DropForeignKey
ALTER TABLE "StockMovement" DROP CONSTRAINT "StockMovement_Movement_batchId_fkey";

-- DropForeignKey
ALTER TABLE "StockMovement" DROP CONSTRAINT "StockMovement_Movement_productId_fkey";

-- DropForeignKey
ALTER TABLE "StockMovement" DROP CONSTRAINT "StockMovement_Movement_userId_fkey";

-- DropForeignKey
ALTER TABLE "Warranty" DROP CONSTRAINT "Warranty_Warranty_saleDetailId_fkey";

-- DropTable
DROP TABLE "BatchInventory";

-- DropTable
DROP TABLE "Devolution";

-- DropTable
DROP TABLE "ExpenseSummary";

-- DropTable
DROP TABLE "InventoryRequests";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProvisionRequest";

-- DropTable
DROP TABLE "Purchase";

-- DropTable
DROP TABLE "PurchaseItem";

-- DropTable
DROP TABLE "PurchaseNote";

-- DropTable
DROP TABLE "Sale";

-- DropTable
DROP TABLE "SaleDetails";

-- DropTable
DROP TABLE "SalesSummary";

-- DropTable
DROP TABLE "StockMovement";

-- DropTable
DROP TABLE "Warranty";
