import "focus-visible"
import type { AppProps } from "next/app"
import Head from "next/head"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Provider as ReakitProvider } from "reakit/Provider"
import { setup } from "twind"
import tailwindConfig from "../../tailwind.config"

if (typeof window !== "undefined") {
	setup(tailwindConfig)
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			retry: process.env.NODE_ENV === "production" ? 3 : false,
		},
	},
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReakitProvider>
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
				<Component {...pageProps} />
				<ReactQueryDevtools />
			</ReakitProvider>
		</QueryClientProvider>
	)
}
