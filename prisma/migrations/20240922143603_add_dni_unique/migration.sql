/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - Made the column `dni` on table `clientes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "clientes" ALTER COLUMN "dni" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "clientes_dni_key" ON "clientes"("dni");
