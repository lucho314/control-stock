import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import DialogNuevoProducto from "./components/dialog-nuevo-producto";
import TableProductos from "./components/table-productos";
import { Paginacion } from "../components/ui/Pagination";
import { getPaginatedProducts, deleteProductImage } from "@/actions";
import { SearchProvider } from "../components/provider/SearchProvider";

export interface Props {
  searchParams: {
    page?: string;
    q?: string;
  };
}

const ProductosPage = async ({ searchParams }: Props) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const q = searchParams.q;

  const { currentPage, totalPages, products } = await getPaginatedProducts({
    page,
    q,
  });

  return (
    <main className="flex-1 p-6">
      <div className="mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Productos</h1>
          <DialogNuevoProducto />
        </div>

        <SearchProvider search={q} urlPush="/admin/productos" />

        <TableProductos productos={products} />
        {
          // Pagination
          totalPages > 1 && (
            <Paginacion
              totalPages={totalPages}
              currentPage={currentPage}
              q={q}
            />
          )
        }
      </div>
    </main>
  );
};

export default ProductosPage;
