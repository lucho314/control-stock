import { getPaginatedProvider } from "@/actions";
import { Button } from "@/components/ui/button";
import { CirclePlus, PlusCircle } from "lucide-react";
import { TableProvider } from "../components/provider/TableProvider";
import { Paginacion } from "../components/ui/Pagination";
import { SearchProvider } from "../components/provider/SearchProvider";
import DialogNewProvider from "../components/provider/dialog-new-provider";

export interface Props {
  searchParams: {
    page?: string;
    q?: string;
  };
}

export default async function ProviderPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const q = searchParams.q;

  const { currentPage, totalPages, providers } = await getPaginatedProvider({
    page,
    q,
  });

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="scroll-m-20 border-b pb-6 text-3xl font-semibold tracking-tight first:mt-0 flex justify-between">
        Provedores
        <DialogNewProvider>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Proveedor
          </Button>
        </DialogNewProvider>
      </h2>
      <SearchProvider search={q} urlPush="/admin/provider" />
      <TableProvider providers={providers} />
      {
        // Pagination
        totalPages > 1 && (
          <Paginacion totalPages={totalPages} currentPage={currentPage} />
        )
      }
    </div>
  );
}
