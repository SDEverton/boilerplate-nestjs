/*
  Warnings:

  - Added the required column `city` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zipcode" TEXT NOT NULL;
