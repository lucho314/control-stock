import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2023 Mi Tienda. Todos los derechos reservados.</p>
        <div className="mt-4">
          <Link href="/terminos" className="text-blue-600 hover:underline mr-4">
            Términos y condiciones
          </Link>
          <Link href="/privacidad" className="text-blue-600 hover:underline">
            Política de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
