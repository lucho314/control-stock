import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { callbackUrl: string | undefined; error?: string };
  children: React.ReactNode;
}

export default async function RootLayout(props: Props) {
  const { children, searchParams } = props;
  const session = await auth();

  if (session) {
    redirect(searchParams?.callbackUrl || "/");
  }

  return (
    <div className="dark:bg-gray-900 min-h-screen w-full flex flex-col">
      {children}
    </div>
  );
}
