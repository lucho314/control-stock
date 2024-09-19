-- CreateTable
CREATE TABLE "acciones_de_usuario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID,
    "accion" TEXT,
    "fecha" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "acciones_de_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_ordenes_de_compra" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "orden_compra_id" UUID,
    "producto_id" UUID,
    "cantidad" INTEGER,
    "precio_unitario" DECIMAL,

    CONSTRAINT "detalle_ordenes_de_compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_ordenes_de_venta" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "orden_venta_id" UUID,
    "producto_id" UUID,
    "cantidad" INTEGER,
    "precio_unitario" DECIMAL,

    CONSTRAINT "detalle_ordenes_de_venta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facturas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "orden_venta_id" UUID,
    "total" DECIMAL,
    "fecha_factura" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "producto_id" UUID,
    "stock_disponible" INTEGER,
    "stock_reservado" INTEGER,
    "stock_en_transito" INTEGER,

    CONSTRAINT "inventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movimientos_de_inventario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "producto_id" UUID,
    "tipo_movimiento" TEXT,
    "cantidad" INTEGER,
    "fecha" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "motivo" TEXT,
    "origen" TEXT,

    CONSTRAINT "movimientos_de_inventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "niveles_de_stock" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "producto_id" UUID,
    "stock_minimo" INTEGER,
    "stock_maximo" INTEGER,

    CONSTRAINT "niveles_de_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordenes_de_compra" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "proveedor_id" UUID,
    "fecha_orden" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT,

    CONSTRAINT "ordenes_de_compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordenes_de_venta" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cliente_id" UUID,
    "fecha_orden" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT,

    CONSTRAINT "ordenes_de_venta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" TEXT,
    "descripcion" TEXT,
    "categoria" TEXT,
    "precio" DECIMAL,
    "codigo_de_barras" TEXT,
    "proveedor_id" UUID,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proveedores" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" TEXT,
    "contacto" TEXT,
    "direccion" TEXT,

    CONSTRAINT "proveedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recepciones_de_productos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "orden_compra_id" UUID,
    "producto_id" UUID,
    "cantidad_recibida" INTEGER,
    "fecha_recepcion" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recepciones_de_productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" TEXT,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" TEXT,
    "rol" TEXT,
    "email" TEXT,
    "contrasena" TEXT,
    "rol_id" UUID,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" TEXT,
    "contacto" TEXT,
    "direccion" TEXT,
    "email" TEXT,
    "telefono" TEXT,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "acciones_de_usuario" ADD CONSTRAINT "acciones_de_usuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_orden_venta_id_fkey" FOREIGN KEY ("orden_venta_id") REFERENCES "ordenes_de_venta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventario" ADD CONSTRAINT "inventario_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movimientos_de_inventario" ADD CONSTRAINT "movimientos_de_inventario_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "niveles_de_stock" ADD CONSTRAINT "niveles_de_stock_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenes_de_compra" ADD CONSTRAINT "ordenes_de_compra_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "proveedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenes_de_venta" ADD CONSTRAINT "ordenes_de_venta_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "proveedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recepciones_de_productos" ADD CONSTRAINT "recepciones_de_productos_orden_compra_id_fkey" FOREIGN KEY ("orden_compra_id") REFERENCES "ordenes_de_compra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recepciones_de_productos" ADD CONSTRAINT "recepciones_de_productos_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
