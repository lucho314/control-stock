import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/auth.config";
import { LoginForm } from "./ui/login-form";

export const metadata = {
  title: "Iniciar sesion",
  description: "Iniciar sesion en Control de Stock",
};

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined; error?: string };
}) {
  const error = props.searchParams?.error;

  return (
    <section className="flex flex-col h-screen items-center justify-center">
      <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Iniciar sesion en Control de Stock
        </h2>
        <LoginForm errorType={error} />
      </div>
    </section>
  );
}
