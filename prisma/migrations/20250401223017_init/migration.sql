/*
  Warnings:

  - You are about to drop the column `Prov_requestedBy` on the `ProvisionRequests` table. All the data in the column will be lost.
  - Added the required column `Prov_requesteBy` to the `ProvisionRequests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProvisionRequests" DROP CONSTRAINT "ProvisionRequests_Prov_requestedBy_fkey";

-- AlterTable
ALTER TABLE "ProvisionRequests" DROP COLUMN "Prov_requestedBy",
ADD COLUMN     "Prov_requesteBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProvisionRequests" ADD CONSTRAINT "ProvisionRequests_Prov_requesteBy_fkey" FOREIGN KEY ("Prov_requesteBy") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;
