/*
  Warnings:

  - A unique constraint covering the columns `[codigo_interno]` on the table `productos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "productos_codigo_interno_key" ON "productos"("codigo_interno");
