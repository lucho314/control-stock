/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `productos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "productos" DROP CONSTRAINT "productos_categoriaId_fkey";

-- AlterTable
ALTER TABLE "productos" DROP COLUMN "categoriaId",
ADD COLUMN     "categoria_id" UUID;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
