"use client";

import ToastProvider from "@/components/ToastProvider/ToastProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import dynamic from "next/dynamic"; 

const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? dynamic(() =>
        import("@tanstack/react-query-devtools").then(
          (mod) => mod.ReactQueryDevtools
        ),
        { ssr: false }
      )
    : () => null;

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 min cache data fresh
         gcTime: 10 * 60 * 1000, // 10 minutes cache time
        refetchOnWindowFocus: false,
        refetchOnMount: true, // component mount pe refetch nahi hoga
        refetchOnReconnect: false, // internet reconnect pe refetch nahi hoga
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
          <ToastProvider />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}