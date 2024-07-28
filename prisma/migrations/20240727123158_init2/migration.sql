/*
  Warnings:

  - You are about to drop the column `postcode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `streetline` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `suburb` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "postcode",
DROP COLUMN "streetline",
DROP COLUMN "suburb",
DROP COLUMN "unit";
