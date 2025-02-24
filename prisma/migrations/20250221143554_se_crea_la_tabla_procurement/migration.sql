/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Category_id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `Category_name` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Customer_address` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Customer_dni` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Customer_email` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Customer_habeasData` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Customer_id` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Customer_name` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Customer_phoneNumber` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Customer_registrationDate` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Customer_surname` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Customer_userId` on the `Customer` table. All the data in the column will be lost.
  - The primary key for the `Supplier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Supplier_active` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `Supplier_address` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `Supplier_city` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `Supplier_contactInfo` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `Supplier_email` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `Supplier_id` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `Supplier_name` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `Supplier_nit` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `Supplier_phoneNumber` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `Supplier_registrationDate` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `Supplier_userId` on the `Supplier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Cat_name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Cust_dni]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Cust_email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Supp_nit]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Supp_email]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Cat_name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Cust_address` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Cust_dni` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Cust_email` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Cust_name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Cust_phoneNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Cust_surname` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Cust_userId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Supp_address` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Supp_city` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Supp_contactInfo` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Supp_email` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Supp_name` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Supp_nit` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Supp_phoneNumber` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Supp_userId` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_Customer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_Supplier_userId_fkey";

-- DropIndex
DROP INDEX "Category_Category_name_key";

-- DropIndex
DROP INDEX "Customer_Customer_dni_key";

-- DropIndex
DROP INDEX "Customer_Customer_email_key";

-- DropIndex
DROP INDEX "Supplier_Supplier_email_key";

-- DropIndex
DROP INDEX "Supplier_Supplier_nit_key";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "Category_id",
DROP COLUMN "Category_name",
ADD COLUMN     "Cat_id" SERIAL NOT NULL,
ADD COLUMN     "Cat_name" TEXT NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("Cat_id");

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "Customer_address",
DROP COLUMN "Customer_dni",
DROP COLUMN "Customer_email",
DROP COLUMN "Customer_habeasData",
DROP COLUMN "Customer_id",
DROP COLUMN "Customer_name",
DROP COLUMN "Customer_phoneNumber",
DROP COLUMN "Customer_registrationDate",
DROP COLUMN "Customer_surname",
DROP COLUMN "Customer_userId",
ADD COLUMN     "Cust_address" TEXT NOT NULL,
ADD COLUMN     "Cust_dni" INTEGER NOT NULL,
ADD COLUMN     "Cust_email" TEXT NOT NULL,
ADD COLUMN     "Cust_habeasData" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "Cust_id" SERIAL NOT NULL,
ADD COLUMN     "Cust_name" TEXT NOT NULL,
ADD COLUMN     "Cust_phoneNumber" TEXT NOT NULL,
ADD COLUMN     "Cust_registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Cust_surname" TEXT NOT NULL,
ADD COLUMN     "Cust_userId" INTEGER NOT NULL,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("Cust_id");

-- AlterTable
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_pkey",
DROP COLUMN "Supplier_active",
DROP COLUMN "Supplier_address",
DROP COLUMN "Supplier_city",
DROP COLUMN "Supplier_contactInfo",
DROP COLUMN "Supplier_email",
DROP COLUMN "Supplier_id",
DROP COLUMN "Supplier_name",
DROP COLUMN "Supplier_nit",
DROP COLUMN "Supplier_phoneNumber",
DROP COLUMN "Supplier_registrationDate",
DROP COLUMN "Supplier_userId",
ADD COLUMN     "Supp_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "Supp_address" TEXT NOT NULL,
ADD COLUMN     "Supp_city" TEXT NOT NULL,
ADD COLUMN     "Supp_contactInfo" TEXT NOT NULL,
ADD COLUMN     "Supp_email" TEXT NOT NULL,
ADD COLUMN     "Supp_id" SERIAL NOT NULL,
ADD COLUMN     "Supp_name" TEXT NOT NULL,
ADD COLUMN     "Supp_nit" INTEGER NOT NULL,
ADD COLUMN     "Supp_phoneNumber" TEXT NOT NULL,
ADD COLUMN     "Supp_registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Supp_userId" INTEGER NOT NULL,
ADD CONSTRAINT "Supplier_pkey" PRIMARY KEY ("Supp_id");

-- CreateTable
CREATE TABLE "Procurement" (
    "Pro_id" SERIAL NOT NULL,
    "Pro_description" TEXT NOT NULL,
    "Pro_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Pro_totalAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "Pro_paymentMethod" TEXT NOT NULL,
    "Pro_dueDate" TIMESTAMP(3) NOT NULL,
    "Pro_close" BOOLEAN NOT NULL DEFAULT false,
    "Pro_processed" BOOLEAN NOT NULL DEFAULT false,
    "Pro_userId" INTEGER NOT NULL,
    "Pro_supplierId" INTEGER NOT NULL,

    CONSTRAINT "Procurement_pkey" PRIMARY KEY ("Pro_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_Cat_name_key" ON "Category"("Cat_name");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Cust_dni_key" ON "Customer"("Cust_dni");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Cust_email_key" ON "Customer"("Cust_email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_Supp_nit_key" ON "Supplier"("Supp_nit");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_Supp_email_key" ON "Supplier"("Supp_email");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_Cust_userId_fkey" FOREIGN KEY ("Cust_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_Supp_userId_fkey" FOREIGN KEY ("Supp_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procurement" ADD CONSTRAINT "Procurement_Pro_userId_fkey" FOREIGN KEY ("Pro_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procurement" ADD CONSTRAINT "Procurement_Pro_supplierId_fkey" FOREIGN KEY ("Pro_supplierId") REFERENCES "Supplier"("Supp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
