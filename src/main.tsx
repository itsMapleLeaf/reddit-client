import { render } from "preact"
import { QueryClient, QueryClientProvider } from "react-query"
import devtools from "react-query/devtools"
import { BrowserRouter, Routes } from "react-router-dom"
import { LazyRoute as LazyRouteBase, LazyRouteProps } from "./lazy-route"
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

function LazyRoute<Path extends string>(
	props: Omit<LazyRouteProps<Path>, "placeholder">,
) {
	return <LazyRouteBase {...props} placeholder={() => <p>Loading...</p>} />
}

const root = (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Routes>
				<LazyRoute path="/" loader={() => import("./home")} />
				<LazyRoute path="/home" loader={() => import("./home")} />
				<LazyRoute path="/home/:sort" loader={() => import("./home")} />
				<Route path="/r/:subreddit/:sort" />
				<LazyRoute
					path="/auth_redirect"
					loader={() => import("./auth-redirect")}
				/>
			</Routes>
		</BrowserRouter>
		<ReactQueryDevtools />
	</QueryClientProvider>
)

render(root, document.getElementById("app")!)
