import { createUpdateProvider } from "@/actions/provider/create-update";
import { deleteProvider } from "@/actions/provider/delete";
import { getPaginatedProvider } from "@/actions/provider/pagination";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { ProviderItem } from "./ui/provider-item";

// export default function NamePage() {
//   const submit = async (formData: FormData) => {
//     "use server";
//     try {
//       await createUpdateProvider(formData);
//     } catch (error) {
//       if (error instanceof AuthError) {
//         console.log(error);
//       }
//       throw error;
//     }
//   };

//   return (
//     <div>
//       <h1>Formulario Proveedor</h1>
//       <form action={submit}>
//         <label htmlFor="nombre">Nombre:</label>
//         <input type="text" name="nombre" id="nombre" required />
//         <label htmlFor="contacto">Contacto:</label>
//         <input type="text" name="contacto" id="contacto" required />
//         <label htmlFor="direccion">Dirección:</label>
//         <input type="text" name="direccion" id="direccion" required />
//         <button type="submit">Guardar</button>
//       </form>
//     </div>
//   );
// }

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function NamePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const submit = async (formData: FormData) => {
    "use server";
    try {
      await createUpdateProvider(formData);
    } catch (error) {
      if (error instanceof AuthError) {
        console.log(error);
      }
      throw error;
    }
  };

  const { providers, currentPage, totalPages } = await getPaginatedProvider({
    page,
  });

  return (
    <div>
      <h1>Proveedores</h1>
      <ul>
        {providers.map((provider) => (
          <ProviderItem key={provider.id} provider={provider} />
        ))}
      </ul>
      <nav>
        {currentPage > 1 && <a href={`?page=${currentPage - 1}`}>Anterior</a>}
        {currentPage < totalPages && (
          <a href={`?page=${currentPage + 1}`}>Siguiente</a>
        )}
      </nav>

      <div>
        <h1>Formulario Proveedor</h1>
        <form action={submit}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" name="nombre" id="nombre" required />
          <label htmlFor="contacto">Contacto:</label>
          <input type="text" name="contacto" id="contacto" required />
          <label htmlFor="direccion">Dirección:</label>
          <input type="text" name="direccion" id="direccion" required />
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
}
