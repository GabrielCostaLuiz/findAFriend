/*
  Warnings:

  - You are about to drop the column `email` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `org_Id` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `pets` table. All the data in the column will be lost.
  - Added the required column `org_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_org_Id_fkey";

-- DropIndex
DROP INDEX "pets_email_key";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "email",
DROP COLUMN "org_Id",
DROP COLUMN "password_hash",
ADD COLUMN     "org_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
