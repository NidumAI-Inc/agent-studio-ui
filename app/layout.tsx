import type { Metadata } from "next";
import "./globals.css";

import ClientWrapper from "@/components/client-wrapper";

export const metadata: Metadata = {
  title: "Nidum Agent",
  description: "",
};

type props = Readonly<{
  children: React.ReactNode;
}>

function RootLayout({ children }: props) {
  return (
    <html lang="en">
      <body className="dark">
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}

export default RootLayout