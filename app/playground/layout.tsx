"use client";

import { ConnectionProvider } from "@/hooks/use-connections";

type props = Readonly<{
  children: React.ReactNode;
}>

function Layout({ children }: props) {
  return (
    <ConnectionProvider>
      {children}
    </ConnectionProvider>
  )
}

export default Layout
