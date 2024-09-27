import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  q?: string;
  totalPages: number;
  currentPage: number;
}

export const Paginacion = ({ q, totalPages, currentPage }: Props) => {
  const query = q ? `q=${q}&` : ``;
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Link
            href={`?${query}page=${currentPage - 1}`}
            aria-disabled={currentPage === 1}
            className={clsx(
              "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-1 pl-2.5",
              currentPage === 1 && "pointer-events-none opacity-50"
            )}
          >
            <ChevronLeft />
            Anterior
          </Link>
        </PaginationItem>

        {/* <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem> */}

        <PaginationItem>
          <ul>
            <Link
              href={`?${query}page=${currentPage + 1}`}
              aria-disabled={currentPage >= totalPages}
              className={clsx(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-1 pl-2.5",
                currentPage >= totalPages && "pointer-events-none opacity-50"
              )}
            >
              Siguiente
              <ChevronRight />
            </Link>
          </ul>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
