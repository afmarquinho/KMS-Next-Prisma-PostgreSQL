/*
  Warnings:

  - Added the required column `Prod_userId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "Prod_userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_Prod_userId_fkey" FOREIGN KEY ("Prod_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;
