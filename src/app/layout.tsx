import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-900 min-h-screen w-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
