-- add_stock_trigger.sql

CREATE OR REPLACE FUNCTION actualizar_stock()
RETURNS TRIGGER AS $$
declare 
v_stock integer;
v_nombre varchar(100);

BEGIN
    IF TG_OP = 'INSERT' THEN
        SELECT "inStock",nombre into v_stock,v_nombre FROM productos WHERE id = NEW."productoId";
         IF (v_stock < NEW.cantidad) THEN
            RAISE EXCEPTION 'Stock insuficiente para el producto %', v_nombre;
        END IF;

        UPDATE productos
        SET "inStock" = "inStock" - NEW.cantidad
        WHERE id = NEW."productoId";  -- Usa comillas dobles para "productoId"
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE productos
        SET "inStock" = "inStock" - (NEW.cantidad - OLD.cantidad)
        WHERE id = NEW."productoId";  -- Usa comillas dobles para "productoId"
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE productos
        SET "inStock" = "inStock" + OLD.cantidad
        WHERE id = OLD."productoId";  -- Usa comillas dobles para "productoId"
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER actualizar_stock_trigger
AFTER INSERT OR UPDATE OR DELETE
ON venta_producto
FOR EACH ROW
EXECUTE FUNCTION actualizar_stock();
