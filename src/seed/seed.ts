import bcryptjs from "bcryptjs";
interface SeedProduct {
  nombre: string;
  descripcion: string;
  precio: number;
  codigo_de_barras: string;
  inStock: number;
  peso: number;
  tamano: number;
  color: string;
  marca: string;
  imagen: string;
  codigo_interno: string;
  created_by: string;
}

interface SeedProveedor {
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  created_by: string;
}

interface SeedUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
}

interface SeedCategoria {
  nombre: string;
  descripcion: string;
}

interface SeedData {
  users: SeedUser[];
  categories: SeedCategoria[];
  products: SeedProduct[];
  providers: SeedProveedor[];
}

export const initialData: SeedData = {
  users: [
    {
      id: "c7fe7451-1610-42c2-8984-7116634c4a0f",
      email: "admin@admin.com",
      name: "Administrador",
      password: bcryptjs.hashSync("123456"),
      role: "admin",
    },
    {
      id: "d1668f75-b7fe-4686-b306-3e33b18a5bba",
      email: "melissa@google.com",
      name: "Melissa Flores",
      password: bcryptjs.hashSync("123456"),
      role: "user",
    },
  ],
  providers: [
    {
      nombre: "Repuestos Moto S.A.",
      direccion: "Av. Libertador 1234, Buenos Aires",
      telefono: "+54 11 1234-5678",
      email: "telefono@repuestosmoto.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Motopartes Argentina",
      direccion: "Calle San Martín 456, Córdoba",
      telefono: "+54 351 9876-5432",
      email: "info@motopartesarg.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Moto Accesorios S.R.L.",
      direccion: "Av. Rivadavia 5678, Buenos Aires",
      telefono: "+54 11 2345-6789",
      email: "contacto@motoaccesorios.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Repuestos Rápidos",
      direccion: "Av. Santa Fe 2345, Buenos Aires",
      telefono: "+54 11 3456-7890",
      email: "info@repuestosrapidos.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Talleres Moto S.A.",
      direccion: "Calle San Juan 789, Rosario",
      telefono: "+54 341 4567-8901",
      email: "ventas@talleresmoto.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Moto Repuestos S.A.",
      direccion: "Av. General Paz 1010, Buenos Aires",
      telefono: "+54 11 4567-8902",
      email: "info@moto-repuestos.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Accesorios de Motocicleta",
      direccion: "Calle Mitre 234, La Plata",
      telefono: "+54 221 5678-9012",
      email: "contacto@accesoriosmoto.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Moto Parts Co.",
      direccion: "Calle Belgrano 3456, Mendoza",
      telefono: "+54 261 6789-0123",
      email: "info@motopartsco.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Repuestos y Accesorios",
      direccion: "Av. Corrientes 4567, Buenos Aires",
      telefono: "+54 11 7890-1234",
      email: "ventas@repuestosyaccesorios.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Motomundi",
      direccion: "Calle Córdoba 876, Santa Fe",
      telefono: "+54 342 8901-2345",
      email: "contacto@motomundi.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Tienda de Motocicletas",
      direccion: "Calle Sarmiento 321, Tucumán",
      telefono: "+54 381 9012-3456",
      email: "info@tiendamotocicletas.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Repuestos en Línea",
      direccion: "Av. Alem 4321, Bahía Blanca",
      telefono: "+54 291 0123-4567",
      email: "contacto@repuestosenlinea.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Moto Expertos",
      direccion: "Calle Rivadavia 567, Salta",
      telefono: "+54 387 1234-5678",
      email: "info@motoexpertos.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Accesorios para Motocicletas",
      direccion: "Av. de Mayo 8910, Quilmes",
      telefono: "+54 11 1234-5670",
      email: "contacto@accesoriosmotocicletas.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Motocicletas S.A.",
      direccion: "Calle Mendoza 1234, San Juan",
      telefono: "+54 264 2345-6789",
      email: "ventas@motocicletassa.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Todo Moto",
      direccion: "Calle 9 de Julio 456, Mar del Plata",
      telefono: "+54 223 3456-7890",
      email: "info@todomoto.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Moto y Más",
      direccion: "Av. Libertador 789, Rosario",
      telefono: "+54 341 5678-9012",
      email: "contacto@motoymas.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Accesorios y Repuestos",
      direccion: "Calle Almirante Brown 234, Mendoza",
      telefono: "+54 261 6789-0124",
      email: "info@accesoriosyrepuestos.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Repuestos y Más",
      direccion: "Calle San Lorenzo 321, Jujuy",
      telefono: "+54 388 7890-1234",
      email: "ventas@repuestosymas.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Tienda Moto",
      direccion: "Av. Centenario 567, Neuquén",
      telefono: "+54 299 8901-2345",
      email: "contacto@tiendamoto.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Repuestos para Motos",
      direccion: "Calle San Luis 876, San Luis",
      telefono: "+54 266 0123-4567",
      email: "info@repuestosparamotos.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "Moto Repuestos y Accesorios",
      direccion: "Av. 25 de Mayo 1010, Chaco",
      telefono: "+54 362 1234-5678",
      email: "contacto@moto-repuestos.com",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
  ],

  categories: [
    {
      nombre: "Componentes del Motor",
      descripcion:
        "Repuestos relacionados con el motor de motocicletas, como cilindros, pistones, y cadenas de distribución.",
    },
    {
      nombre: "Transmisión",
      descripcion:
        "Partes que involucran la transmisión de potencia, como cadenas, engranajes, y embragues.",
    },
    {
      nombre: "Suspensión",
      descripcion:
        "Componentes que afectan la suspensión de la motocicleta, como amortiguadores y horquillas.",
    },
    {
      nombre: "Frenos",
      descripcion:
        "Repuestos relacionados con el sistema de frenos, como pastillas, discos, y bombas de freno.",
    },
    {
      nombre: "Sistema Eléctrico",
      descripcion:
        "Partes eléctricas de la motocicleta, como baterías, alternadores y luces.",
    },
    {
      nombre: "Carrocería y Accesorios Exteriores",
      descripcion:
        "Elementos que componen la carrocería, como guardabarros, carenados, y espejos.",
    },
    {
      nombre: "Sistema de Combustible",
      descripcion:
        "Repuestos para el sistema de combustible, como bombas, filtros, e inyectores.",
    },
    {
      nombre: "Ruedas y Neumáticos",
      descripcion:
        "Componentes relacionados con las ruedas, como neumáticos, llantas y válvulas.",
    },
    {
      nombre: "Accesorios y Personalización",
      descripcion:
        "Accesorios para personalizar motocicletas, como manillares, asientos y maleteros.",
    },
    {
      nombre: "Herramientas y Equipos",
      descripcion:
        "Herramientas y equipos necesarios para el mantenimiento y reparación de motocicletas.",
    },
    {
      nombre: "Ropa y Seguridad",
      descripcion:
        "Equipos de seguridad y vestimenta para motociclistas, como cascos, guantes y chaquetas.",
    },
    {
      nombre: "Lubricantes y Productos de Mantenimiento",
      descripcion:
        "Aceites y productos de mantenimiento para asegurar el buen funcionamiento de la motocicleta.",
    },
    {
      nombre: "Recambios OEM y Aftermarket",
      descripcion:
        "Partes originales del fabricante y repuestos de terceros (Aftermarket).",
    },
    {
      nombre: "Partes Especializadas",
      descripcion:
        "Componentes especializados y de alto rendimiento para motocicletas.",
    },
  ],

  products: [
    {
      nombre: "INTERCOMUNICADOR BLUETOOTH SENA",
      descripcion:
        "INTERCOMUNICADOR BLUETOOTH PARA COMUNICACIÓN ENTRE MOTOCICLISTAS.",
      precio: 149.99,
      codigo_de_barras: "8889900112233",
      inStock: 25,
      peso: 0.5,
      tamano: 10,
      color: "Negro",
      marca: "Sena",
      imagen: "https://m.media-amazon.com/images/I/51F0jBNsUZL._AC_SL1500_.jpg",
      codigo_interno: "SN008",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "BUJÍA NGK IRIDIUM",
      descripcion: "BUJÍA DE ALTO RENDIMIENTO NGK IRIDIUM PARA MOTOCICLETAS.",
      precio: 25.5,
      codigo_de_barras: "9988776655443",
      inStock: 100,
      peso: 0.1,
      tamano: 4,
      color: "Plata",
      marca: "NGK",
      imagen:
        "https://acdn.mitiendanube.com/stores/108/925/products/thp-x1-0863f93daa99e57f1f17164811657594-1024-1024.jpg",
      codigo_interno: "456FG",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "LUBRICANTE MOTUL 300V",
      descripcion:
        "LUBRICANTE SINTÉTICO DE ALTO RENDIMIENTO PARA MOTOCICLETAS.",
      precio: 25.99,
      codigo_de_barras: "3334455667788",
      inStock: 50,
      peso: 1,
      tamano: 1,
      color: "Amarillo",
      marca: "Motul",
      imagen: "https://ar.moovelub.com/storage/uploads/00000000340.png",
      codigo_interno: "MT003",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "KIT DE HERRAMIENTAS HONDA",
      descripcion:
        "KIT DE HERRAMIENTAS PARA MANTENIMIENTO DE MOTOCICLETAS HONDA.",
      precio: 59.99,
      codigo_de_barras: "7778899000112",
      inStock: 12,
      peso: 1.5,
      tamano: 25,
      color: "Negro",
      marca: "Honda",
      imagen:
        "https://http2.mlstatic.com/D_NQ_NP_915607-MLA75070271330_032024-O.webp",
      codigo_interno: "HN007",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "CARENADO COMPLETO KAWASAKI ZX-6R",
      descripcion: "CARENADO COMPLETO DE REPUESTO PARA KAWASAKI ZX-6R.",
      precio: 500,
      codigo_de_barras: "5556677789900",
      inStock: 8,
      peso: 5,
      tamano: 60,
      color: "Verde",
      marca: "Kawasaki",
      imagen:
        "https://m.media-amazon.com/images/I/61k6sFlhqZL._AC_UF894,1000_QL80_.jpg",
      codigo_interno: "KW005",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "LLAVE DE IMPACTO HONDA",
      descripcion: "LLAVE DE IMPACTO PARA MOTOCICLETAS HONDA CBR600RR.",
      precio: 85.5,
      codigo_de_barras: "3344556677889",
      inStock: 12,
      peso: 1.2,
      tamano: 20,
      color: "Rojo",
      marca: "Honda",
      imagen: "https://http2.mlstatic.com/D_932217-MLA74928491757_032024-C.jpg",
      codigo_interno: "210FH",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "AMORTIGUADOR TRASERO HONDA",
      descripcion: "AMORTIGUADOR TRASERO PARA MOTOCICLETAS HONDA, MODELO CB500",
      precio: 120,
      codigo_de_barras: "1122334455667",
      inStock: 20,
      peso: 2.8,
      tamano: 45,
      color: "Rojo",
      marca: "Honda",
      imagen:
        "https://andreanimhs.com/img/product/img-00000199-600x600-pad.jpg?token=73c51afa8186877cfb5129bfb0c06acd",
      codigo_interno: "123DE",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "FRENO DE DISCO TRASERO SUZUKI",
      descripcion: "FRENO DE DISCO TRASERO PARA MOTOCICLETAS SUZUKI GSX-R.",
      precio: 75.5,
      codigo_de_barras: "4445566678899",
      inStock: 15,
      peso: 1.1,
      tamano: 30,
      color: "Negro",
      marca: "Suzuki",
      imagen:
        "https://http2.mlstatic.com/D_NQ_NP_865825-CBT73561151923_122023-O.webp",
      codigo_interno: "SZ004",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "FRENOS DE DISCO GALFER",
      descripcion:
        "FRENOS DE DISCO DE ALTO RENDIMIENTO GALFER PARA MOTOCICLETAS.",
      precio: 85,
      codigo_de_barras: "9990011223344",
      inStock: 20,
      peso: 1,
      tamano: 30,
      color: "Rojo",
      marca: "Galfer",
      imagen:
        "https://i.ebayimg.com/thumbs/images/g/ZG0AAOSwa45ml-1R/s-l1200.jpg",
      codigo_interno: "GF009",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "CARENADO FRONTAL HONDA CBR",
      descripcion: "CARENADO FRONTAL DE REPUESTO PARA HONDA CBR.",
      precio: 250,
      codigo_de_barras: "1122446688990",
      inStock: 15,
      peso: 3,
      tamano: 50,
      color: "Negro",
      marca: "Honda",
      imagen:
        "https://http2.mlstatic.com/D_NQ_NP_990036-MLA74687587911_022024-O.webp",
      codigo_interno: "213FH",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "PASTILLAS DE FRENO TRASERO SUZUKI",
      descripcion:
        "PASTILLAS DE FRENO TRASERO PARA MOTOCICLETAS SUZUKI GIXXER.",
      precio: 35,
      codigo_de_barras: "9900112233445",
      inStock: 45,
      peso: 0.4,
      tamano: 8,
      color: "Negro",
      marca: "Suzuki",
      imagen:
        "https://http2.mlstatic.com/D_NQ_NP_870408-MLA51669645351_092022-O.webp",
      codigo_interno: "213FQ",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
    {
      nombre: "CÁMARA DE AIRE PIRELLI",
      descripcion: "CÁMARA DE AIRE PARA NEUMÁTICOS DE MOTOCICLETAS DEPORTIVAS.",
      precio: 19.99,
      codigo_de_barras: "6667788899001",
      inStock: 40,
      peso: 0.3,
      tamano: 17,
      color: "Negro",
      marca: "Pirelli",
      imagen:
        "https://http2.mlstatic.com/D_NQ_NP_981990-MLU73109711247_112023-O.webp",
      codigo_interno: "PR006",
      created_by: "c7fe7451-1610-42c2-8984-7116634c4a0f",
    },
  ],
};
