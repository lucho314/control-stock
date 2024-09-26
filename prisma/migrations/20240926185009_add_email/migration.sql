/*
  Warnings:

  - You are about to drop the column `contacto` on the `proveedores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "proveedores" DROP COLUMN "contacto",
ADD COLUMN     "direccion" TEXT;
