import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { callbackUrl: string | undefined; error?: string };
  children: React.ReactNode;
}

export default async function RootLayout({ children, ...props }: Props) {
  const session = await auth();

  if (session) {
    redirect(props.searchParams?.callbackUrl || "/");
  }

  return (
    <html lang="en">
      <body className="dark:bg-gray-900 min-h-screen w-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
