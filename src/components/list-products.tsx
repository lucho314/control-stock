"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface IProducto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

// Simulación de datos de productos
const generarProductos = (): IProducto[] =>
  Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    nombre: `Producto ${i + 1}`,
    precio: Math.floor(Math.random() * 100) + 1,
    imagen: `https://imgs.search.brave.com/Lel2sTEXCxvixfcCGmqqD_ME2YXTTx09AV3K325-iok/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU1/MTYxNjk0L2VzL2Zv/dG8vbW90b3ItZGUt/Y29jaGUuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPTJBZjdZ/aVU3R3oxSV9vNlRW/Tjd6QXdzbS15VEFk/REhXSWJkc3VCY2t6/NE09`,
  }));

const Listproducts = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState<IProducto[]>([]);
  const productosPorPagina = 8;

  // Generar los productos solo en el cliente
  useEffect(() => {
    const productosGenerados = generarProductos();
    setProductos(productosGenerados);
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );

  return (
    <div>
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosActuales.map((producto) => (
          <div
            key={producto.id}
            className="border rounded-lg p-4 flex flex-col"
          >
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-40 object-cover mb-4 rounded"
              width={400}
              height={400}
            />
            <h3 className="text-lg font-semibold mb-2">{producto.nombre}</h3>
            <p className="text-gray-600 mb-4">${producto.precio}</p>
            <div className="d-flex">
              <Link
                href={"/products/" + producto.id}
                className="text-2xl font-bold"
              >
                <Button className="mt-auto m-1">Ver</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <nav>
          <ul className="flex">
            <li>
              <Button
                onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                disabled={paginaActual === 1}
                className="mr-2"
              >
                Anterior
              </Button>
            </li>
            <li>
              <Button
                onClick={() =>
                  setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
                }
                disabled={paginaActual === totalPaginas}
              >
                Siguiente
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Listproducts;
