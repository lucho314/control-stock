import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { SearchSale } from "../components/sale/SearchSale";
import { TableSale } from "../components/sale/TableSale";
import { DialogNewSale } from "../components/sale/DialogNewSale";
import { getPaginatedSale } from "@/actions/sale/paginated-sale";
import { Paginacion } from "../components/ui/Pagination";

export interface Props {
  searchParams: {
    page?: string;
    q?: string;
  };
}

export default async function SalePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const q = searchParams.q;
  const { currentPage, totalPages, sales } = await getPaginatedSale({
    page,
    q,
  });

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="scroll-m-20 border-b pb-6 text-3xl font-semibold tracking-tight first:mt-0 flex justify-between">
        Ventas
        <DialogNewSale>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Venta (F2)
          </Button>
        </DialogNewSale>
      </h2>
      <SearchSale />
      <TableSale sales={sales} />

      {
        // Pagination
        totalPages > 1 && (
          <Paginacion totalPages={totalPages} currentPage={currentPage} />
        )
      }
    </div>
  );
}
