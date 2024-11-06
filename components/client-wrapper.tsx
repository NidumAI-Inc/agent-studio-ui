"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from "next-auth/react";
import { Toaster } from "./ui/toaster";

import queryClient from "@/lib/query-client";

interface props {
  children?: ReactNode
}

function ClientWrapper({ children }: props) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}

        <Toaster />
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default ClientWrapper