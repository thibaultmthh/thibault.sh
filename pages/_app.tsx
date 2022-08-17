import "../styles/globals.scss";
import "styles/Projects.scss";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />{" "}
    </QueryClientProvider>
  );
}

export default MyApp;
