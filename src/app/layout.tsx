import type { Metadata } from "next";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "BRANIMULAI - Direktori UMKM",
  description: "Direktori UMKM terpercaya untuk mendukung usaha lokal Indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
