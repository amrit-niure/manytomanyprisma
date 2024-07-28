/*
  Warnings:

  - You are about to drop the `_AddressToCustomer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AddressToCustomer" DROP CONSTRAINT "_AddressToCustomer_A_fkey";

-- DropForeignKey
ALTER TABLE "_AddressToCustomer" DROP CONSTRAINT "_AddressToCustomer_B_fkey";

-- DropTable
DROP TABLE "_AddressToCustomer";

-- CreateTable
CREATE TABLE "_CustomerAddresses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerAddresses_AB_unique" ON "_CustomerAddresses"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerAddresses_B_index" ON "_CustomerAddresses"("B");

-- AddForeignKey
ALTER TABLE "_CustomerAddresses" ADD CONSTRAINT "_CustomerAddresses_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerAddresses" ADD CONSTRAINT "_CustomerAddresses_B_fkey" FOREIGN KEY ("B") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
