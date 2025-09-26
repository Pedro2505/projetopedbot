import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { NavLinks } from "./components/NavLinks";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FarmaControl",
  description: "Gerencie seu estoque de medicamentos de forma eficiente e segura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased flex flex-row gap-2 min-h-screen`}>
        <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
          <h1 className="text-xl font-bold text-teal-700 mb-6">FarmaControl</h1>
          <NavLinks />
      </aside>
        {children}
      </body>
    </html>
  );
}
