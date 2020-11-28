import { render } from "preact"
import { QueryClient, QueryClientProvider } from "react-query"
import { App } from "./app"

render(
	<QueryClientProvider client={new QueryClient()}>
		<App />
	</QueryClientProvider>,
	document.getElementById("app")!,
)

declare global {
	interface ImportMeta {
		env: { [key: string]: string | undefined }
	}
}
