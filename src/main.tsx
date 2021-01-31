import { render } from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { BrowserRouter, Routes } from "react-router-dom"
import { HomePage } from "./app/HomePage"
import { AuthRedirect } from "./auth/AuthRedirect"
import { Route } from "./routing/Route"
import { SubredditPage } from "./subreddit/SubredditPage"

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
				<Route path="/home" component={HomePage} />
				<Route path="/home/:sort" component={HomePage} />
				<Route path="/r/:subreddit" component={SubredditPage} />
				<Route path="/r/:subreddit/:sort" component={SubredditPage} />
				<Route path="/auth_redirect" component={AuthRedirect} />
				<Route path="*">
					<p>page not found :(</p>
				</Route>
			</Routes>
		</BrowserRouter>
		<ReactQueryDevtools />
	</QueryClientProvider>
)

render(root, document.getElementById("app")!)
