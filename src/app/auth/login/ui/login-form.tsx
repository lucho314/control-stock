import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { IoInformationOutline } from "react-icons/io5";
import Link from "next/link";

interface Props {
  errorType: string | undefined;
}

export const LoginForm = ({ errorType }: Props) => {
  const SIGNIN_ERROR_URL = "/auth/login";

  //obtener los query params

  return (
    <form
      className="mt-8 space-y-6"
      action={async (formData) => {
        "use server";
        try {
          await signIn("credentials", formData);
        } catch (error) {
          if (error instanceof AuthError) {
            return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
          }
          throw error;
        }
      }}
    >
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Su Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Su Contraseña
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      {errorType === "CredentialsSignin" && (
        <div className="flex flex-row mb-2">
          <IoInformationOutline className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">Credenciales no son correctas</p>
        </div>
      )}
      <div className="flex items-start">
        <a
          href="#"
          className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Olvido su contraseña?
        </a>
      </div>
      <button
        type="submit"
        className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Iniciar Sesion
      </button>
      <div className="text-sm font-medium text-gray-900 dark:text-white">
        Not registered yet?{" "}
        <Link
          href={"/auth/new-account"}
          className="text-blue-600 hover:underline dark:text-blue-500"
        >
          Create account
        </Link>
      </div>
    </form>
  );
};
