import type { Metadata, Viewport } from "next";
import BackgroundMusic from "@/components/BackgroundMusic";
import "./globals.css";

export const metadata: Metadata = {
  title: "Undangan Ngunduh Mantu",
  description: "Undangan pernikahan Amr dan Ishmah",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <BackgroundMusic>{children}</BackgroundMusic>
      </body>
    </html>
  );
}
