-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "streetline" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AddressToCustomer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToCustomer_AB_unique" ON "_AddressToCustomer"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToCustomer_B_index" ON "_AddressToCustomer"("B");

-- AddForeignKey
ALTER TABLE "_AddressToCustomer" ADD CONSTRAINT "_AddressToCustomer_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToCustomer" ADD CONSTRAINT "_AddressToCustomer_B_fkey" FOREIGN KEY ("B") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
