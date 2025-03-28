-- CreateTable
CREATE TABLE "Departments" (
    "Dep_id" SERIAL NOT NULL,
    "Dep_name" TEXT NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("Dep_id")
);

-- CreateTable
CREATE TABLE "User" (
    "User_id" SERIAL NOT NULL,
    "User_code" TEXT NOT NULL,
    "User_dni" INTEGER NOT NULL,
    "User_role" TEXT NOT NULL,
    "User_name" TEXT NOT NULL,
    "User_surname" TEXT NOT NULL,
    "User_email" TEXT NOT NULL,
    "User_password" TEXT NOT NULL,
    "User_phoneNumber" TEXT NOT NULL,
    "User_address" TEXT NOT NULL,
    "User_active" BOOLEAN NOT NULL DEFAULT true,
    "User_registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "User_depId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("User_id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "Cust_id" SERIAL NOT NULL,
    "Cust_dni" INTEGER NOT NULL,
    "Cust_name" TEXT NOT NULL,
    "Cust_surname" TEXT NOT NULL,
    "Cust_email" TEXT NOT NULL,
    "Cust_phoneNumber" TEXT NOT NULL,
    "Cust_address" TEXT NOT NULL,
    "Cust_habeasData" BOOLEAN NOT NULL DEFAULT true,
    "Cust_registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("Cust_id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "Supp_id" SERIAL NOT NULL,
    "Supp_nit" INTEGER NOT NULL,
    "Supp_name" TEXT NOT NULL,
    "Supp_contactInfo" TEXT NOT NULL,
    "Supp_email" TEXT NOT NULL,
    "Supp_phoneNumber" TEXT NOT NULL,
    "Supp_city" TEXT NOT NULL,
    "Supp_address" TEXT NOT NULL,
    "Supp_active" BOOLEAN NOT NULL DEFAULT true,
    "Supp_registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("Supp_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "Cat_id" SERIAL NOT NULL,
    "Cat_name" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("Cat_id")
);

-- CreateTable
CREATE TABLE "Procurement" (
    "Proc_id" SERIAL NOT NULL,
    "Proc_desc" TEXT NOT NULL,
    "Proc_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Proc_totalAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "Proc_paymentMethod" TEXT NOT NULL,
    "Proc_dueDate" TIMESTAMP(3) NOT NULL,
    "Proc_close" BOOLEAN NOT NULL DEFAULT false,
    "Proc_processed" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" INTEGER NOT NULL,
    "Proc_suppId" INTEGER NOT NULL,

    CONSTRAINT "Procurement_pkey" PRIMARY KEY ("Proc_id")
);

-- CreateTable
CREATE TABLE "Item" (
    "Item_id" SERIAL NOT NULL,
    "Item_unitCost" DECIMAL(65,30) NOT NULL,
    "Item_qtyOrdered" INTEGER NOT NULL,
    "Item_totalAmount" DECIMAL(65,30) NOT NULL,
    "Item_qtyReceived" INTEGER NOT NULL DEFAULT 0,
    "Item_location" TEXT NOT NULL DEFAULT 'UNRECEIVED',
    "Item_status" TEXT NOT NULL DEFAULT 'ORDERED',
    "Item_prodId" INTEGER NOT NULL,
    "Item_procId" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("Item_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "Prod_id" SERIAL NOT NULL,
    "Prod_name" TEXT NOT NULL,
    "Prod_ref" TEXT NOT NULL,
    "Prod_desc" TEXT NOT NULL,
    "Prod_catId" INTEGER NOT NULL,
    "Prod_procurementEnabled" BOOLEAN NOT NULL DEFAULT true,
    "Prod_brand" TEXT,
    "Prod_unitMeasure" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("Prod_id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "Inv_id" SERIAL NOT NULL,
    "Inv_prodId" INTEGER NOT NULL,
    "Inv_stock" INTEGER NOT NULL,
    "Inv_saleEnabled" BOOLEAN NOT NULL DEFAULT true,
    "Inv_location" TEXT NOT NULL DEFAULT 'Bodega',
    "Inv_itemId" INTEGER NOT NULL,
    "Inv_batch" TEXT NOT NULL,
    "Inv_batchDueDate" TIMESTAMP(3) NOT NULL,
    "Inv_margin" DECIMAL(65,30) NOT NULL DEFAULT 0.15,
    "Inv_marginValidity" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("Inv_id")
);

-- CreateTable
CREATE TABLE "ProcurementNote" (
    "Note_id" SERIAL NOT NULL,
    "Note_content" TEXT NOT NULL,
    "Note_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Note_userId" INTEGER NOT NULL,
    "Note_procId" INTEGER NOT NULL,

    CONSTRAINT "ProcurementNote_pkey" PRIMARY KEY ("Note_id")
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
    "Mov_procId" INTEGER,
    "Mov_saleId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "InventoryInv_id" INTEGER,

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
CREATE UNIQUE INDEX "Departments_Dep_name_key" ON "Departments"("Dep_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_User_code_key" ON "User"("User_code");

-- CreateIndex
CREATE UNIQUE INDEX "User_User_dni_key" ON "User"("User_dni");

-- CreateIndex
CREATE UNIQUE INDEX "User_User_email_key" ON "User"("User_email");

-- CreateIndex
CREATE UNIQUE INDEX "User_User_phoneNumber_key" ON "User"("User_phoneNumber");

-- CreateIndex
CREATE INDEX "User_User_email_User_phoneNumber_User_dni_idx" ON "User"("User_email", "User_phoneNumber", "User_dni");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Cust_dni_key" ON "Customer"("Cust_dni");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Cust_email_key" ON "Customer"("Cust_email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_Supp_nit_key" ON "Supplier"("Supp_nit");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_Supp_email_key" ON "Supplier"("Supp_email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_Cat_name_key" ON "Category"("Cat_name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_Prod_name_key" ON "Product"("Prod_name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_Prod_ref_key" ON "Product"("Prod_ref");

-- CreateIndex
CREATE INDEX "ProcurementNote_Note_procId_idx" ON "ProcurementNote"("Note_procId");

-- CreateIndex
CREATE INDEX "StockMovement_Mov_prodId_Mov_dest_Mov_type_idx" ON "StockMovement"("Mov_prodId", "Mov_dest", "Mov_type");

-- CreateIndex
CREATE INDEX "InventoryRequests_Req_prodId_idx" ON "InventoryRequests"("Req_prodId");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_Sale_code_key" ON "Sale"("Sale_code");

-- CreateIndex
CREATE UNIQUE INDEX "SalesSummary_SalesSumm_saleId_key" ON "SalesSummary"("SalesSumm_saleId");

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseSummary_ExpSumm_purchaseId_key" ON "ExpenseSummary"("ExpSumm_purchaseId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_User_depId_fkey" FOREIGN KEY ("User_depId") REFERENCES "Departments"("Dep_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procurement" ADD CONSTRAINT "Procurement_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procurement" ADD CONSTRAINT "Procurement_Proc_suppId_fkey" FOREIGN KEY ("Proc_suppId") REFERENCES "Supplier"("Supp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_Item_procId_fkey" FOREIGN KEY ("Item_procId") REFERENCES "Procurement"("Proc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_Item_prodId_fkey" FOREIGN KEY ("Item_prodId") REFERENCES "Product"("Prod_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_Prod_catId_fkey" FOREIGN KEY ("Prod_catId") REFERENCES "Category"("Cat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_Inv_prodId_fkey" FOREIGN KEY ("Inv_prodId") REFERENCES "Product"("Prod_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_Inv_itemId_fkey" FOREIGN KEY ("Inv_itemId") REFERENCES "Item"("Item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcurementNote" ADD CONSTRAINT "ProcurementNote_Note_userId_fkey" FOREIGN KEY ("Note_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcurementNote" ADD CONSTRAINT "ProcurementNote_Note_procId_fkey" FOREIGN KEY ("Note_procId") REFERENCES "Procurement"("Proc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvisionRequests" ADD CONSTRAINT "ProvisionRequests_Prov_prodId_fkey" FOREIGN KEY ("Prov_prodId") REFERENCES "Product"("Prod_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvisionRequests" ADD CONSTRAINT "ProvisionRequests_Prov_requestedBy_fkey" FOREIGN KEY ("Prov_requestedBy") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_Mov_prodId_fkey" FOREIGN KEY ("Mov_prodId") REFERENCES "Product"("Prod_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_Mov_procId_fkey" FOREIGN KEY ("Mov_procId") REFERENCES "Procurement"("Proc_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_Mov_saleId_fkey" FOREIGN KEY ("Mov_saleId") REFERENCES "Sale"("Sale_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_Mov_userId_fkey" FOREIGN KEY ("Mov_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_InventoryInv_id_fkey" FOREIGN KEY ("InventoryInv_id") REFERENCES "Inventory"("Inv_id") ON DELETE SET NULL ON UPDATE CASCADE;

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
