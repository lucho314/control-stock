-- AlterTable
ALTER TABLE "productos" ADD COLUMN     "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6),
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "proveedores" ADD COLUMN     "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6),
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6),
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "venta" ADD COLUMN     "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6),
ADD COLUMN     "updated_by" TEXT;
