import type { Metadata } from "next";

import "./globals.css";

export default function RootLayout({
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
