/*
  Warnings:

  - You are about to drop the column `Prov_requesteBy` on the `ProvisionRequests` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `ProvisionRequests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProvisionRequests" DROP CONSTRAINT "ProvisionRequests_Prov_requesteBy_fkey";

-- AlterTable
ALTER TABLE "ProvisionRequests" DROP COLUMN "Prov_requesteBy",
ADD COLUMN     "createdBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProvisionRequests" ADD CONSTRAINT "ProvisionRequests_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;
