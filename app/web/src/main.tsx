import { render } from "preact"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query-devtools"
import { App } from "./app/App"
import { RouteProvider } from "./router"
import "./styles.css"

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

render(
	<QueryClientProvider client={queryClient}>
		<RouteProvider>
			<App />
		</RouteProvider>
		<ReactQueryDevtools />
	</QueryClientProvider>,
	document.getElementById("app")!,
)
