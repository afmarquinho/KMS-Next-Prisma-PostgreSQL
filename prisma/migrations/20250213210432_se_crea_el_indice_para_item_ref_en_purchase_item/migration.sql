-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "Customer_habeasData" SET DEFAULT true;

-- AlterTable
ALTER TABLE "PurchaseItem" ALTER COLUMN "Item_ref" DROP NOT NULL;
