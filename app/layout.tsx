import type { Metadata } from "next";
import "./globals.css";

import ClientWrapper from "@/components/client-wrapper";
import config from "@/lib/config";

export const metadata: Metadata = {
  title: `${config.companyName} Agent`,
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