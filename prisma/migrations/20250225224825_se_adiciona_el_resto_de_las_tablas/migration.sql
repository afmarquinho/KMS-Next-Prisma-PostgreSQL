-- CreateTable
CREATE TABLE "Product" (
    "Prod_id" SERIAL NOT NULL,
    "Prod_name" TEXT NOT NULL,
    "Prod_ref" TEXT NOT NULL,
    "Prod_reorderPoint" INTEGER NOT NULL DEFAULT 0,
    "Prod_active" BOOLEAN NOT NULL DEFAULT true,
    "Prod_stockQty" INTEGER NOT NULL DEFAULT 0,
    "Prod_itemId" INTEGER NOT NULL,
    "Prod_catId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("Prod_id")
);

-- CreateTable
CREATE TABLE "PurchaseNote" (
    "Note_id" SERIAL NOT NULL,
    "Note_content" TEXT NOT NULL,
    "Note_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Note_userId" INTEGER NOT NULL,
    "Note_proId" INTEGER NOT NULL,

    CONSTRAINT "PurchaseNote_pkey" PRIMARY KEY ("Note_id")
);

-- CreateTable
CREATE TABLE "BatchInventory" (
    "Batch_id" SERIAL NOT NULL,
    "Batch_code" TEXT NOT NULL,
    "Batch_stockQty" INTEGER NOT NULL DEFAULT 0,
    "Batch_location" TEXT NOT NULL DEFAULT 'Bodega',
    "Batch_userId" INTEGER NOT NULL,
    "Batch_itemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BatchInventory_pkey" PRIMARY KEY ("Batch_id")
);

-- CreateTable
CREATE TABLE "ProvisionRequests" (
    "Prov_id" SERIAL NOT NULL,
    "Prov_prodId" INTEGER NOT NULL,
    "Prov_quantity" INTEGER NOT NULL,
    "Prov_status" TEXT NOT NULL DEFAULT 'pending',
    "Prov_desc" TEXT NOT NULL,
    "Prov_requestedBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProvisionRequests_pkey" PRIMARY KEY ("Prov_id")
);

-- CreateTable
CREATE TABLE "StockMovement" (
    "Mov_id" SERIAL NOT NULL,
    "Mov_type" TEXT NOT NULL,
    "Mov_qty" INTEGER NOT NULL,
    "Mov_reason" TEXT NOT NULL,
    "Mov_prodId" INTEGER NOT NULL,
    "Mov_dest" TEXT NOT NULL DEFAULT 'bodega',
    "Mov_userId" INTEGER NOT NULL,
    "Mov_relatedId" INTEGER,
    "Mov_batchId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockMovement_pkey" PRIMARY KEY ("Mov_id")
);

-- CreateTable
CREATE TABLE "InventoryRequests" (
    "Req_id" SERIAL NOT NULL,
    "Req_prodId" INTEGER NOT NULL,
    "Req_depId" INTEGER NOT NULL,
    "Req_desc" TEXT NOT NULL,
    "Req_qty" INTEGER NOT NULL,
    "Req_close" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InventoryRequests_pkey" PRIMARY KEY ("Req_id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "Sale_id" SERIAL NOT NULL,
    "Sale_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Sale_code" TEXT,
    "Sale_custId" INTEGER NOT NULL,
    "Sale_totalAmount" DECIMAL(65,30) NOT NULL,
    "Sale_userId" INTEGER NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("Sale_id")
);

-- CreateTable
CREATE TABLE "SaleDetails" (
    "Sxdet_id" SERIAL NOT NULL,
    "Sxdet_saleId" INTEGER NOT NULL,
    "Sxdet_prodId" INTEGER NOT NULL,
    "Sxdet_qty" INTEGER NOT NULL,
    "Sxdet_unitPrice" DECIMAL(65,30) NOT NULL,
    "Sxdet_total" DECIMAL(65,30) NOT NULL,
    "purchaseItemItem_id" INTEGER,

    CONSTRAINT "SaleDetails_pkey" PRIMARY KEY ("Sxdet_id")
);

-- CreateTable
CREATE TABLE "Warranty" (
    "Warranty_id" SERIAL NOT NULL,
    "Warranty_description" TEXT NOT NULL,
    "Warranty_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Warranty_saleDetailId" INTEGER NOT NULL,

    CONSTRAINT "Warranty_pkey" PRIMARY KEY ("Warranty_id")
);

-- CreateTable
CREATE TABLE "SalesSummary" (
    "SalesSumm_id" SERIAL NOT NULL,
    "SalesSumm_saleId" INTEGER NOT NULL,
    "SalesSumm_totalAmount" DECIMAL(65,30) NOT NULL,
    "SalesSumm_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesSummary_pkey" PRIMARY KEY ("SalesSumm_id")
);

-- CreateTable
CREATE TABLE "ExpenseSummary" (
    "ExpSumm_id" SERIAL NOT NULL,
    "ExpSumm_purchaseId" INTEGER NOT NULL,
    "ExpSumm_totalExpenses" DECIMAL(65,30) NOT NULL,
    "ExpSumm_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseSummary_pkey" PRIMARY KEY ("ExpSumm_id")
);

-- CreateTable
CREATE TABLE "Devolution" (
    "Dev_id" SERIAL NOT NULL,
    "Dev_description" TEXT NOT NULL,
    "Dev_saleDetailsId" INTEGER NOT NULL,
    "Dev_quantity" INTEGER NOT NULL,
    "Dev_unitPrice" DECIMAL(65,30) NOT NULL,
    "Dev_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Devolution_pkey" PRIMARY KEY ("Dev_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_Prod_name_key" ON "Product"("Prod_name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_Prod_ref_key" ON "Product"("Prod_ref");

-- CreateIndex
CREATE UNIQUE INDEX "BatchInventory_Batch_code_key" ON "BatchInventory"("Batch_code");

-- CreateIndex
CREATE UNIQUE INDEX "BatchInventory_Batch_itemId_key" ON "BatchInventory"("Batch_itemId");

-- CreateIndex
CREATE INDEX "BatchInventory_Batch_itemId_idx" ON "BatchInventory"("Batch_itemId");

-- CreateIndex
CREATE INDEX "StockMovement_Mov_prodId_Mov_dest_idx" ON "StockMovement"("Mov_prodId", "Mov_dest");

-- CreateIndex
CREATE INDEX "InventoryRequests_Req_prodId_idx" ON "InventoryRequests"("Req_prodId");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_Sale_code_key" ON "Sale"("Sale_code");

-- CreateIndex
CREATE UNIQUE INDEX "SalesSummary_SalesSumm_saleId_key" ON "SalesSummary"("SalesSumm_saleId");

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseSummary_ExpSumm_purchaseId_key" ON "ExpenseSummary"("ExpSumm_purchaseId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_Prod_catId_fkey" FOREIGN KEY ("Prod_catId") REFERENCES "Category"("Cat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_Prod_itemId_fkey" FOREIGN KEY ("Prod_itemId") REFERENCES "Item"("Item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseNote" ADD CONSTRAINT "PurchaseNote_Note_userId_fkey" FOREIGN KEY ("Note_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseNote" ADD CONSTRAINT "PurchaseNote_Note_proId_fkey" FOREIGN KEY ("Note_proId") REFERENCES "Procurement"("Pro_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchInventory" ADD CONSTRAINT "BatchInventory_Batch_itemId_fkey" FOREIGN KEY ("Batch_itemId") REFERENCES "Item"("Item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvisionRequests" ADD CONSTRAINT "ProvisionRequests_Prov_prodId_fkey" FOREIGN KEY ("Prov_prodId") REFERENCES "Product"("Prod_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvisionRequests" ADD CONSTRAINT "ProvisionRequests_Prov_requestedBy_fkey" FOREIGN KEY ("Prov_requestedBy") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_Mov_batchId_fkey" FOREIGN KEY ("Mov_batchId") REFERENCES "BatchInventory"("Batch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_Mov_prodId_fkey" FOREIGN KEY ("Mov_prodId") REFERENCES "Product"("Prod_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_Mov_userId_fkey" FOREIGN KEY ("Mov_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryRequests" ADD CONSTRAINT "InventoryRequests_Req_prodId_fkey" FOREIGN KEY ("Req_prodId") REFERENCES "Product"("Prod_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryRequests" ADD CONSTRAINT "InventoryRequests_Req_depId_fkey" FOREIGN KEY ("Req_depId") REFERENCES "Departments"("Dep_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_Sale_custId_fkey" FOREIGN KEY ("Sale_custId") REFERENCES "Customer"("Cust_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_Sale_userId_fkey" FOREIGN KEY ("Sale_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetails" ADD CONSTRAINT "SaleDetails_Sxdet_saleId_fkey" FOREIGN KEY ("Sxdet_saleId") REFERENCES "Sale"("Sale_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetails" ADD CONSTRAINT "SaleDetails_purchaseItemItem_id_fkey" FOREIGN KEY ("purchaseItemItem_id") REFERENCES "Item"("Item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_Warranty_saleDetailId_fkey" FOREIGN KEY ("Warranty_saleDetailId") REFERENCES "SaleDetails"("Sxdet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesSummary" ADD CONSTRAINT "SalesSummary_SalesSumm_saleId_fkey" FOREIGN KEY ("SalesSumm_saleId") REFERENCES "Sale"("Sale_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devolution" ADD CONSTRAINT "Devolution_Dev_saleDetailsId_fkey" FOREIGN KEY ("Dev_saleDetailsId") REFERENCES "SaleDetails"("Sxdet_id") ON DELETE RESTRICT ON UPDATE CASCADE;
