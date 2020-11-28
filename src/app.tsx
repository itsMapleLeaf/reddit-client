import { useQuery } from "react-query"
import { AuthRedirectHandler } from "./auth"
import { redditRedirectUri } from "./reddit"
import { useRoute } from "./router"
import { encodeUriParams } from "./url"

export function App() {
	const route = useRoute()

	if (route.name === "authRedirect") {
		return <AuthRedirectHandler authCode={route.params.code} />
	}

	return <AuthSwitch />
}

function AuthSwitch() {
	const { data, isLoading } = useQuery(
		["session"],
		async () => {
			const res = await fetch(`/api/session`, {
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			})

			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error || `Request failed`)
			}

			return await data
		},
		{ retry: false },
	)

	if (isLoading) {
		return <p>Loading...</p>
	}

	const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?${encodeUriParams(
		{
			client_id: import.meta.env.VITE_REDDIT_APP_ID!,
			response_type: `code`,
			state: `.`,
			redirect_uri: redditRedirectUri,
			duration: `permanent`,
			scope: "identity read",
		},
	)}`

	return data.session ? <LoggedInRoutes /> : <a href={redditAuthUrl}>Login</a>
}

function LoggedInRoutes() {
	const route = useRoute()

	if (route.name === "home") {
		return <main>hi</main>
	}

	return null
}
