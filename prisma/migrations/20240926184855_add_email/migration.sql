/*
  Warnings:

  - You are about to drop the column `direccion` on the `proveedores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "proveedores" DROP COLUMN "direccion",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "telefono" TEXT;
