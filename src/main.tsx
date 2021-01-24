import { render } from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { BrowserRouter, Routes } from "react-router-dom"
import {
	LazyRoute as LazyRouteBase,
	LazyRouteProps,
} from "./routing/lazy-route"
import { Route } from "./routing/route"

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
	return <LazyRouteBase {...props} placeholder={<p>Loading...</p>} />
}

const root = (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Routes>
				<LazyRoute path="/" loader={() => import("./app/home-page")} />
				<LazyRoute path="/home" loader={() => import("./app/home-page")} />
				<LazyRoute
					path="/home/:sort"
					loader={() => import("./app/home-page")}
				/>
				<Route path="/r/:subreddit/:sort" />
				<LazyRoute
					path="/auth_redirect"
					loader={() => import("./auth/auth-redirect")}
				/>
			</Routes>
		</BrowserRouter>
		<ReactQueryDevtools />
	</QueryClientProvider>
)

render(root, document.getElementById("app")!)
