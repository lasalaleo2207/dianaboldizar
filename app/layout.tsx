import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Centro de Control | Diana Boldizar",
  description: "Sistema operativo del proyecto estratégico de Diana Boldizar.",
  icons: {
    icon: "/brand/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
