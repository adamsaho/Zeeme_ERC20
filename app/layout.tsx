import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "CryptoLaunch — Launch Your ERC20 Token in Minutes",
  description:
    "Professional ERC20 Token Creation Services with secure deployment, ownership management, and optional verification.",
  icons: {
    icon: "/logo.jpg",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
