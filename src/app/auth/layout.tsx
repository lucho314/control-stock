import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="dark:bg-gray-900 min-h-screen w-full flex flex-col">
      {children}
    </div>
  );
}
