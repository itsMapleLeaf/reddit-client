import { render } from "preact"
import { useEffect } from "preact/hooks"
import { QueryClient, QueryClientProvider } from "react-query"
import devtools from "react-query/devtools"
import { BrowserRouter, Routes } from "react-router-dom"
import { AuthRedirect } from "./auth-redirect"
import { Route } from "./route"

const { ReactQueryDevtools } = devtools

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
				<Route path="/" component={Test} />
				<Route path="/home">{() => <p>this is home</p>}</Route>
				<Route path="/home/:sort">{({ sort }) => <p>this is {sort}</p>}</Route>
				<Route path="/r/:subreddit/:sort" />
				<Route path="/auth_redirect" component={AuthRedirect} />
			</Routes>
		</BrowserRouter>
		<ReactQueryDevtools />
	</QueryClientProvider>
)

render(root, document.getElementById("app")!)

function Test() {
	useEffect(() => {
		fetch("/api/session")
			.then((res) => res.json())
			.then(console.log)
	}, [])
	return null
}
