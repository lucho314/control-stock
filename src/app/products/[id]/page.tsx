import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Params {
  id: number;
}

interface Props {
  params: Params;
}

const getProduct = async (id: number): Promise<any> => {
  const producto = {
    id: 1,
    nombre: "Cámara DSLR Profesional",
    precio: 1299.99,
    descripcion:
      "Cámara DSLR de alta gama con sensor de imagen de 24.2 megapíxeles, grabación de video 4K, pantalla táctil abatible y conectividad Wi-Fi integrada.",
    imagen:
      "https://imgs.search.brave.com/mamDGQSBcmOkymClGv2ip-IF2Dm-0ChMxv2juNC_SgE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuaG90c2FsZS5j/b20uYXIvdXBsb2Fk/cy9vZmZlcnMvMTM0/MDY0LzYwOTJhYTA4/ZWY0ZTMuanBnP3c9/NTAwJmg9Mzc1",
    caracteristicas: [
      "Sensor CMOS de 24.2 megapíxeles",
      "Grabación de video 4K/30p",
      "Pantalla táctil LCD de 3 pulgadas",
      "ISO 100-25600 (expandible a 51200)",
      "Disparo continuo de hasta 7 fps",
      "Conectividad Wi-Fi y Bluetooth",
    ],
    valoracion: 4.7,
    numeroResenas: 253,
  };
  return producto;
};

const ProductPage = async ({ params }: Props) => {
  const producto = await getProduct(params.id);
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:underline mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a la tienda
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            width={400}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{producto.nombre}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-4">
            ${producto.precio.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">{producto.descripcion}</p>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Características principales:
            </h2>
            <ul className="list-disc list-inside">
              {producto.caracteristicas.map(
                (caracteristica: any, index: number) => (
                  <li key={index} className="text-gray-700">
                    {caracteristica}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <Button size="lg">Añadir al carrito</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
