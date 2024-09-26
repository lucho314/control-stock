import { getPaginatedProducts } from "@/actions";
import { auth } from "@/auth.config";
import { Product } from "@/components/Product/Product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductList({ searchParams }: Props) {
  const session = await auth();

  const login = session ? true : false;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProducts({
    page,
  });

  return (
    <section>
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Buscar productos..."
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Product key={product.id} producto={product} login={login} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <nav>
          <ul className="flex">
            {currentPage > 1 && (
              <Button className="mr-2">
                <Link href={`?page=${currentPage - 1}`}>Anterior</Link>
              </Button>
            )}
            {currentPage < totalPages && (
              <Button>
                <Link href={`?page=${currentPage + 1}`}>Siguiente</Link>
              </Button>
            )}
          </ul>
        </nav>
      </div>
    </section>
  );
}
