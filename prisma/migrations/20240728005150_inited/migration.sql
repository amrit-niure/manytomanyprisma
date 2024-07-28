/*
  Warnings:

  - You are about to drop the column `firstname` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "firstname",
DROP COLUMN "lastname",
DROP COLUMN "phone",
ADD COLUMN     "name" TEXT;
