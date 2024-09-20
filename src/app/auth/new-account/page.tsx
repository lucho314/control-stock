import { RegisterForm } from "./ui/RegisterForm";

export const metadata = {
  title: "Registro de cuenta",
  description: "Registro de cuenta en Control de Stock",
};

export default function NewAccountPage() {
  return (
    <section className="flex flex-col h-screen items-center justify-center">
      <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Nueva cuenta
        </h2>

        <RegisterForm />
      </div>
    </section>
  );
}
