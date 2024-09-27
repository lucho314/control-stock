import { getPaginatedProvider } from "@/actions";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { TableProvider } from "../components/provider/TableProvider";
import { Paginacion } from "../components/ui/Pagination";
import { SearchProvider } from "../components/provider/SearchProvider";

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
    <section className="w-full px-10 pt-20">
      <h2 className="scroll-m-20 border-b pb-6 text-3xl font-semibold tracking-tight first:mt-0 flex justify-between">
        Provedores
        <Button className="mt-auto m-1">
          <CirclePlus className="h-5 w-5 mr-2" />
          Nuevo proveedor
        </Button>
      </h2>
      <SearchProvider search={q} urlPush="/admin/provider" />
      <TableProvider providers={providers} />
      {
        // Pagination
        totalPages > 1 && (
          <Paginacion totalPages={totalPages} currentPage={currentPage} />
        )
      }
    </section>
  );
}
