-- CreateIndex
CREATE INDEX "productos_nombre_codigo_de_barras_codigo_interno_idx" ON "productos"("nombre", "codigo_de_barras", "codigo_interno");
