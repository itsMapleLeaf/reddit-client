import { AppProps } from "next/app"
import Head from "next/head"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query-devtools"
import { RouteProvider } from "../app/router"
import "../app/styles.css"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
			cacheTime: Infinity,
			retry: 1,
		},
	},
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Head>
				<title>awesome reddit client</title>
			</Head>

			<RouteProvider>
				<Component {...pageProps} />
			</RouteProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
