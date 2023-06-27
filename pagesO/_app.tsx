import "../styles/globals.scss";
import "styles/Projects.scss";
import { QueryClient, QueryClientProvider, QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import axios, { Axios } from "axios";

// Define a default query function that will receive the query key
const defaultQueryFn: QueryFunction<unknown, QueryKey> = async ({ queryKey }) => {
  const { data } = await axios.get(queryKey[0] as string);
  return data;
};

// provide the default query function to your app with defaultOptions
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />{" "}
    </QueryClientProvider>
  );
}

export default MyApp;
