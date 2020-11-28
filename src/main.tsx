import { render } from "preact"
import { QueryClient, QueryClientProvider } from "react-query"
import { App } from "./app"
import { RouteProvider } from "./router"

render(
	<QueryClientProvider client={new QueryClient()}>
		<RouteProvider>
			<App />
		</RouteProvider>
	</QueryClientProvider>,
	document.getElementById("app")!,
)
