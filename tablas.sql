-- Gestión de productos
drop table if exists proveedores cascade;

create table proveedores (
  id uuid primary key default gen_random_uuid (),
  nombre text,
  contacto text,
  dirección text
);

drop table if exists productos cascade;

create table productos (
  id uuid primary key default gen_random_uuid (),
  nombre text,
  descripción text,
  categoría text,
  precio numeric,
  código_de_barras text,
  proveedor_id uuid references proveedores (id)
);

drop table if exists niveles_de_stock cascade;

create table niveles_de_stock (
  id uuid primary key default gen_random_uuid (),
  producto_id uuid references productos (id),
  stock_mínimo integer,
  stock_máximo integer
);

-- Inventario
drop table if exists inventario cascade;

create table inventario (
  id uuid primary key default gen_random_uuid (),
  producto_id uuid references productos (id),
  stock_disponible integer,
  stock_reservado integer,
  stock_en_transito integer
);

drop table if exists movimientos_de_inventario cascade;

create table movimientos_de_inventario (
  id uuid primary key default gen_random_uuid (),
  producto_id uuid references productos (id),
  tipo_movimiento text,
  cantidad integer,
  fecha timestamp with time zone default now(),
  motivo text
);

-- Compras
drop table if exists ordenes_de_compra cascade;

create table ordenes_de_compra (
  id uuid primary key default gen_random_uuid (),
  proveedor_id uuid references proveedores (id),
  fecha_orden timestamp with time zone default now(),
  estado text
);

drop table if exists recepciones_de_productos cascade;

create table recepciones_de_productos (
  id uuid primary key default gen_random_uuid (),
  orden_compra_id uuid references ordenes_de_compra (id),
  producto_id uuid references productos (id),
  cantidad_recibida integer,
  fecha_recepcion timestamp with time zone default now()
);

-- Ventas
drop table if exists ordenes_de_venta cascade;

create table ordenes_de_venta (
  id uuid primary key default gen_random_uuid (),
  cliente_id uuid,
  fecha_orden timestamp with time zone default now(),
  estado text
);

drop table if exists facturas cascade;

create table facturas (
  id uuid primary key default gen_random_uuid (),
  orden_venta_id uuid references ordenes_de_venta (id),
  total numeric,
  fecha_factura timestamp with time zone default now()
);

-- Usuarios y roles
drop table if exists usuarios cascade;

create table usuarios (
  id uuid primary key default gen_random_uuid (),
  nombre text,
  rol text,
  email text,
  contraseña text
);

drop table if exists acciones_de_usuario cascade;

create table acciones_de_usuario (
  id uuid primary key default gen_random_uuid (),
  usuario_id uuid references usuarios (id),
  acción text,
  fecha timestamp with time zone default now()
);