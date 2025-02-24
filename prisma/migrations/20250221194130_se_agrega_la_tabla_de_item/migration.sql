-- CreateTable
CREATE TABLE "Item" (
    "Item_id" SERIAL NOT NULL,
    "Item_ref" TEXT,
    "Item_name" TEXT NOT NULL,
    "Item_description" TEXT NOT NULL,
    "Item_unitCost" DECIMAL(65,30) NOT NULL,
    "Item_qtyOrdered" INTEGER NOT NULL,
    "Item_totalAmount" DECIMAL(65,30) NOT NULL,
    "Item_qtyReceive" INTEGER NOT NULL,
    "Item_location" TEXT NOT NULL DEFAULT 'UNRECEIVED',
    "Item_status" TEXT NOT NULL DEFAULT 'ORDERED',
    "Item_unitMeasure" TEXT NOT NULL,
    "Item_proId" INTEGER NOT NULL,
    "Item_catId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("Item_id")
);

-- CreateIndex
CREATE INDEX "Item_Item_ref_idx" ON "Item"("Item_ref");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_Item_proId_fkey" FOREIGN KEY ("Item_proId") REFERENCES "Procurement"("Pro_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_Item_catId_fkey" FOREIGN KEY ("Item_catId") REFERENCES "Category"("Cat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
