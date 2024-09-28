/*
  Warnings:

  - Added the required column `numeracion` to the `venta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "venta" ADD COLUMN     "numeracion" TEXT NOT NULL;
