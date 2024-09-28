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
}

interface SeedProveedor {
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
}

interface SeedUser {
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
      email: "admin@admin.com",
      name: "Administrador",
      password: bcryptjs.hashSync("123456"),
      role: "admin",
    },
    {
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
    },
    {
      nombre: "Motopartes Argentina",
      direccion: "Calle San Martín 456, Córdoba",
      telefono: "+54 351 9876-5432",
      email: "info@motopartesarg.com",
    },
    {
      nombre: "Moto Accesorios S.R.L.",
      direccion: "Av. Rivadavia 5678, Buenos Aires",
      telefono: "+54 11 2345-6789",
      email: "contacto@motoaccesorios.com",
    },
    {
      nombre: "Repuestos Rápidos",
      direccion: "Av. Santa Fe 2345, Buenos Aires",
      telefono: "+54 11 3456-7890",
      email: "info@repuestosrapidos.com",
    },
    {
      nombre: "Talleres Moto S.A.",
      direccion: "Calle San Juan 789, Rosario",
      telefono: "+54 341 4567-8901",
      email: "ventas@talleresmoto.com",
    },
    {
      nombre: "Moto Repuestos S.A.",
      direccion: "Av. General Paz 1010, Buenos Aires",
      telefono: "+54 11 4567-8902",
      email: "info@moto-repuestos.com",
    },
    {
      nombre: "Accesorios de Motocicleta",
      direccion: "Calle Mitre 234, La Plata",
      telefono: "+54 221 5678-9012",
      email: "contacto@accesoriosmoto.com",
    },
    {
      nombre: "Moto Parts Co.",
      direccion: "Calle Belgrano 3456, Mendoza",
      telefono: "+54 261 6789-0123",
      email: "info@motopartsco.com",
    },
    {
      nombre: "Repuestos y Accesorios",
      direccion: "Av. Corrientes 4567, Buenos Aires",
      telefono: "+54 11 7890-1234",
      email: "ventas@repuestosyaccesorios.com",
    },
    {
      nombre: "Motomundi",
      direccion: "Calle Córdoba 876, Santa Fe",
      telefono: "+54 342 8901-2345",
      email: "contacto@motomundi.com",
    },
    {
      nombre: "Tienda de Motocicletas",
      direccion: "Calle Sarmiento 321, Tucumán",
      telefono: "+54 381 9012-3456",
      email: "info@tiendamotocicletas.com",
    },
    {
      nombre: "Repuestos en Línea",
      direccion: "Av. Alem 4321, Bahía Blanca",
      telefono: "+54 291 0123-4567",
      email: "contacto@repuestosenlinea.com",
    },
    {
      nombre: "Moto Expertos",
      direccion: "Calle Rivadavia 567, Salta",
      telefono: "+54 387 1234-5678",
      email: "info@motoexpertos.com",
    },
    {
      nombre: "Accesorios para Motocicletas",
      direccion: "Av. de Mayo 8910, Quilmes",
      telefono: "+54 11 1234-5670",
      email: "contacto@accesoriosmotocicletas.com",
    },
    {
      nombre: "Motocicletas S.A.",
      direccion: "Calle Mendoza 1234, San Juan",
      telefono: "+54 264 2345-6789",
      email: "ventas@motocicletassa.com",
    },
    {
      nombre: "Todo Moto",
      direccion: "Calle 9 de Julio 456, Mar del Plata",
      telefono: "+54 223 3456-7890",
      email: "info@todomoto.com",
    },
    {
      nombre: "Moto y Más",
      direccion: "Av. Libertador 789, Rosario",
      telefono: "+54 341 5678-9012",
      email: "contacto@motoymas.com",
    },
    {
      nombre: "Accesorios y Repuestos",
      direccion: "Calle Almirante Brown 234, Mendoza",
      telefono: "+54 261 6789-0124",
      email: "info@accesoriosyrepuestos.com",
    },
    {
      nombre: "Repuestos y Más",
      direccion: "Calle San Lorenzo 321, Jujuy",
      telefono: "+54 388 7890-1234",
      email: "ventas@repuestosymas.com",
    },
    {
      nombre: "Tienda Moto",
      direccion: "Av. Centenario 567, Neuquén",
      telefono: "+54 299 8901-2345",
      email: "contacto@tiendamoto.com",
    },
    {
      nombre: "Repuestos para Motos",
      direccion: "Calle San Luis 876, San Luis",
      telefono: "+54 266 0123-4567",
      email: "info@repuestosparamotos.com",
    },
    {
      nombre: "Moto Repuestos y Accesorios",
      direccion: "Av. 25 de Mayo 1010, Chaco",
      telefono: "+54 362 1234-5678",
      email: "contacto@moto-repuestos.com",
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
      nombre: "Filtro de aceite Yamaha",
      descripcion: "Filtro de aceite para motocicletas Yamaha",
      precio: 15.99,
      codigo_de_barras: "1234567890123",
      inStock: 50,
      peso: 0.2,
      tamano: 5.5,
      color: "Negro",
      marca: "Yamaha",
      imagen: "filtro-de-aceite-yamaha.png",
      codigo_interno: "12AB",
    },
    {
      nombre: "Cadena de Transmisión Kawasaki",
      descripcion:
        "Cadena de transmisión de alto rendimiento para motocicletas Kawasaki",
      precio: 45.99,
      codigo_de_barras: "9876543210987",
      inStock: 30,
      peso: 1.5,
      tamano: 120,
      color: "Plata",
      marca: "Kawasaki",
      imagen: "cadena-de-transmision-kawasaki.png",
      codigo_interno: "123BC",
    },
    {
      nombre: "Amortiguador Trasero Honda",
      descripcion: "Amortiguador trasero para motocicletas Honda, modelo CB500",
      precio: 120.0,
      codigo_de_barras: "1122334455667",
      inStock: 20,
      peso: 2.8,
      tamano: 45,
      color: "Rojo",
      marca: "Honda",
      imagen: "amortiguador-trasero-honda.png",
      codigo_interno: "123DE",
    },
    {
      nombre: "Bujía NGK Iridium",
      descripcion: "Bujía de alto rendimiento NGK Iridium para motocicletas.",
      precio: 25.5,
      codigo_de_barras: "9988776655443",
      inStock: 100,
      peso: 0.1,
      tamano: 4.0,
      color: "Plata",
      marca: "NGK",
      imagen: "bujia-ngk-iridium.png",
      codigo_interno: "456FG",
    },
    {
      nombre: "Carenado Frontal Honda CBR",
      descripcion: "Carenado frontal de repuesto para Honda CBR.",
      precio: 250.0,
      codigo_de_barras: "1122446688990",
      inStock: 15,
      peso: 3.0,
      tamano: 50,
      color: "Negro",
      marca: "Honda",
      imagen: "carenado-frontal-honda-cbr.png",
      codigo_interno: "213FH",
    },
    {
      nombre: "Freno de Disco Delantero Yamaha",
      descripcion: "Freno de disco delantero para motocicletas Yamaha R15.",
      precio: 85.75,
      codigo_de_barras: "3344556677889",
      inStock: 40,
      peso: 1.2,
      tamano: 35,
      color: "Negro",
      marca: "Yamaha",
      imagen: "freno-de-disco-delantero-yamaha.png",
      codigo_interno: "213FB",
    },
    {
      nombre: "Espejo Retrovisor Kawasaki Ninja",
      descripcion: "Espejo retrovisor izquierdo para Kawasaki Ninja ZX-10R.",
      precio: 35.99,
      codigo_de_barras: "4455667788990",
      inStock: 25,
      peso: 0.5,
      tamano: 15,
      color: "Negro",
      marca: "Kawasaki",
      imagen: "espejo-retrovisor-kawasaki-ninja.png",
      codigo_interno: "213FJ",
    },
    {
      nombre: "Cubre Cadena Suzuki GSX",
      descripcion: "Cubre cadena para motocicletas Suzuki GSX-S750.",
      precio: 45.0,
      codigo_de_barras: "5566778899001",
      inStock: 35,
      peso: 0.7,
      tamano: 40,
      color: "Gris",
      marca: "Suzuki",
      imagen: "cubre-cadena-suzuki-gsx.png",
      codigo_interno: "213FL",
    },
    {
      nombre: "Filtro de Aire Honda CB300",
      descripcion: "Filtro de aire para motocicletas Honda CB300R.",
      precio: 20.5,
      codigo_de_barras: "6677889900112",
      inStock: 60,
      peso: 0.3,
      tamano: 10,
      color: "Rojo",
      marca: "Honda",
      imagen: "filtro-de-aire-honda-cb300.png",
      codigo_interno: "213FP",
    },
    {
      nombre: "Caballete Central KTM Duke",
      descripcion: "Caballete central para motocicletas KTM Duke 390.",
      precio: 55.75,
      codigo_de_barras: "7788990011223",
      inStock: 20,
      peso: 1.8,
      tamano: 50,
      color: "Naranja",
      marca: "KTM",
      imagen: "caballete-central-ktm-duke.png",
      codigo_interno: "213AH",
    },
    {
      nombre: "Manillar Yamaha MT-07",
      descripcion: "Manillar de reemplazo para Yamaha MT-07.",
      precio: 65.9,
      codigo_de_barras: "8899001122334",
      inStock: 15,
      peso: 0.9,
      tamano: 60,
      color: "Negro",
      marca: "Yamaha",
      imagen: "manillar-yamaha-mt07.png",
      codigo_interno: "213QH",
    },
    {
      nombre: "Pastillas de Freno Trasero Suzuki",
      descripcion:
        "Pastillas de freno trasero para motocicletas Suzuki Gixxer.",
      precio: 35.0,
      codigo_de_barras: "9900112233445",
      inStock: 45,
      peso: 0.4,
      tamano: 8,
      color: "Negro",
      marca: "Suzuki",
      imagen: "pastillas-de-freno-trasero-suzuki.png",
      codigo_interno: "213FQ",
    },
    {
      nombre: "Cubierta Pirelli Diablo Rosso II",
      descripcion: "Cubierta deportiva para motocicletas de alta cilindrada.",
      precio: 120.99,
      codigo_de_barras: "1122334455667",
      inStock: 10,
      peso: 7.5,
      tamano: 180,
      color: "Negro",
      marca: "Pirelli",
      imagen: "cubierta-pirelli-diablo-rosso-ii.png",
      codigo_interno: "215FH",
    },
    {
      nombre: "Tapón de Aceite Kawasaki",
      descripcion: "Tapón de aceite para motocicletas Kawasaki Ninja.",
      precio: 10.99,
      codigo_de_barras: "2233445566778",
      inStock: 80,
      peso: 0.1,
      tamano: 5,
      color: "Verde",
      marca: "Kawasaki",
      imagen: "tapon-de-aceite-kawasaki.png",
      codigo_interno: "211FH",
    },
    {
      nombre: "Llave de Impacto Honda",
      descripcion: "Llave de impacto para motocicletas Honda CBR600RR.",
      precio: 85.5,
      codigo_de_barras: "3344556677889",
      inStock: 12,
      peso: 1.2,
      tamano: 20,
      color: "Rojo",
      marca: "Honda",
      imagen: "llave-de-impacto-honda.png",
      codigo_interno: "210FH",
    },
    {
      nombre: "Sistema de Escape Akrapovic",
      descripcion:
        "Sistema de escape de alto rendimiento para motocicletas deportivas.",
      precio: 699.99,
      codigo_de_barras: "1112233445566",
      inStock: 5,
      peso: 3.0,
      tamano: 100,
      color: "Negro",
      marca: "Akrapovic",
      imagen: "sistema-de-escape-akrapovic.png",
      codigo_interno: "AK001",
    },
    {
      nombre: "Toma de Aire KTM",
      descripcion:
        "Toma de aire optimizada para mejorar el rendimiento del motor.",
      precio: 45.0,
      codigo_de_barras: "2223344556677",
      inStock: 20,
      peso: 0.5,
      tamano: 30,
      color: "Transparente",
      marca: "KTM",
      imagen: "toma-de-aire-ktm.png",
      codigo_interno: "KT002",
    },
    {
      nombre: "Lubricante Motul 300V",
      descripcion:
        "Lubricante sintético de alto rendimiento para motocicletas.",
      precio: 25.99,
      codigo_de_barras: "3334455667788",
      inStock: 50,
      peso: 1.0,
      tamano: 1.0,
      color: "Amarillo",
      marca: "Motul",
      imagen: "lubricante-motul-300v.png",
      codigo_interno: "MT003",
    },
    {
      nombre: "Freno de Disco Trasero Suzuki",
      descripcion: "Freno de disco trasero para motocicletas Suzuki GSX-R.",
      precio: 75.5,
      codigo_de_barras: "4445566678899",
      inStock: 15,
      peso: 1.1,
      tamano: 30,
      color: "Negro",
      marca: "Suzuki",
      imagen: "freno-de-disco-trasero-suzuki.png",
      codigo_interno: "SZ004",
    },
    {
      nombre: "Carenado Completo Kawasaki ZX-6R",
      descripcion: "Carenado completo de repuesto para Kawasaki ZX-6R.",
      precio: 500.0,
      codigo_de_barras: "5556677789900",
      inStock: 8,
      peso: 5.0,
      tamano: 60,
      color: "Verde",
      marca: "Kawasaki",
      imagen: "carenado-completo-kawasaki-zx6r.png",
      codigo_interno: "KW005",
    },
    {
      nombre: "Cámara de Aire Pirelli",
      descripcion: "Cámara de aire para neumáticos de motocicletas deportivas.",
      precio: 19.99,
      codigo_de_barras: "6667788899001",
      inStock: 40,
      peso: 0.3,
      tamano: 17,
      color: "Negro",
      marca: "Pirelli",
      imagen: "camara-de-aire-pirelli.png",
      codigo_interno: "PR006",
    },
    {
      nombre: "Kit de Herramientas Honda",
      descripcion:
        "Kit de herramientas para mantenimiento de motocicletas Honda.",
      precio: 59.99,
      codigo_de_barras: "7778899000112",
      inStock: 12,
      peso: 1.5,
      tamano: 25,
      color: "Negro",
      marca: "Honda",
      imagen: "kit-de-herramientas-honda.png",
      codigo_interno: "HN007",
    },
    {
      nombre: "Intercomunicador Bluetooth Sena",
      descripcion:
        "Intercomunicador Bluetooth para comunicación entre motociclistas.",
      precio: 149.99,
      codigo_de_barras: "8889900112233",
      inStock: 25,
      peso: 0.5,
      tamano: 10,
      color: "Negro",
      marca: "Sena",
      imagen: "intercomunicador-bluetooth-sena.png",
      codigo_interno: "SN008",
    },
    {
      nombre: "Frenos de Disco Galfer",
      descripcion:
        "Frenos de disco de alto rendimiento Galfer para motocicletas.",
      precio: 85.0,
      codigo_de_barras: "9990011223344",
      inStock: 20,
      peso: 1.0,
      tamano: 30,
      color: "Rojo",
      marca: "Galfer",
      imagen: "frenos-de-disco-galfer.png",
      codigo_interno: "GF009",
    },
    {
      nombre: "Casco Integral HJC",
      descripcion:
        "Casco integral HJC para motociclistas, con certificación de seguridad.",
      precio: 199.99,
      codigo_de_barras: "1000112233445",
      inStock: 30,
      peso: 1.2,
      tamano: 15,
      color: "Blanco",
      marca: "HJC",
      imagen: "casco-integral-hjc.png",
      codigo_interno: "HJ010",
    },
  ],
};
