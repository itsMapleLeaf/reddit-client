import { render } from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { BrowserRouter, Routes } from "react-router-dom"
import { HomePage } from "./app/home-page"
import { AuthRedirect } from "./auth/auth-redirect"
import { Route } from "./routing/route"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			retry: process.env.NODE_ENV === "production" ? 3 : false,
		},
	},
})

const root = (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Routes>
				<Route path="/" component={HomePage} />
				<Route path="/" component={HomePage} />
				<Route path="/home" component={HomePage} />
				<Route path="/home/:sort" component={HomePage} />
				<Route path="/r/:subreddit/:sort" />
				<Route path="/auth_redirect" component={AuthRedirect} />
			</Routes>
		</BrowserRouter>
		<ReactQueryDevtools />
	</QueryClientProvider>
)

render(root, document.getElementById("app")!)
