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
				<link
					href="https://fonts.googleapis.com/css?family=Fira+Sans:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css?family=Fira+Sans+Condensed:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"
					rel="stylesheet"
				/>
			</Head>

			<RouteProvider>
				<Component {...pageProps} />
			</RouteProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
