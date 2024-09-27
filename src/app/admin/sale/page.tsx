import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { SearchSale } from "../components/sale/SearchSale";
import { TableSale } from "../components/sale/TableSale";
import { DialogNewSale } from "../components/sale/DialogNewSale";

export default function SalePage() {
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
      <TableSale />
      {/* <SearchProvider search={q} urlPush="/admin/provider" />
      <TableProvider providers={providers} />
      {
        // Pagination
        totalPages > 1 && (
          <Paginacion totalPages={totalPages} currentPage={currentPage} />
        )
      } */}
    </div>
  );
}
