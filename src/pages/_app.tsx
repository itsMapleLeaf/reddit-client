import { cache } from "@emotion/css"
import { CacheProvider, Global } from "@emotion/react"
import "focus-visible"
import type { AppProps } from "next/app"
import Head from "next/head"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import tw, { css, GlobalStyles as TwinGlobalStyles } from "twin.macro"

const baseStyle = css({
	":root": tw`text-gray-100 break-words bg-gray-900`,
	"[data-js-focus-visible] :focus:not([data-focus-visible-added])": {
		outline: "none",
	},
})

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
		<CacheProvider value={cache}>
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

				<TwinGlobalStyles />
				<Global styles={baseStyle} />

				<Component {...pageProps} />

				<ReactQueryDevtools />
			</QueryClientProvider>
		</CacheProvider>
	)
}
