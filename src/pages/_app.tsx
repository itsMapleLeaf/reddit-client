import { AppProps } from "next/app"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query-devtools"
import { RouteProvider } from "../client/router"
import "../client/styles.css"

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
			<RouteProvider>
				<Component {...pageProps} />
			</RouteProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
