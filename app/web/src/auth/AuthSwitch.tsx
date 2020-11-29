import { LoggedInRoutes } from "../app/LoggedInRoutes"
import { SessionProvider, useSessionQuery } from "./session"

export function AuthSwitch() {
	const { data: session, isLoading } = useSessionQuery()

	if (isLoading) {
		return <p>Loading...</p>
	}

	const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?${encodeUriParams(
		{
			client_id: import.meta.env.VITE_REDDIT_APP_ID!,
			response_type: `code`,
			state: `.`,
			redirect_uri: import.meta.env.VITE_REDDIT_APP_REDIRECT_URI!,
			duration: `permanent`,
			scope: "identity read",
		},
	)}`

	return session?.redditTokens ? (
		<SessionProvider session={session}>
			<LoggedInRoutes />
		</SessionProvider>
	) : (
		<a href={redditAuthUrl}>Login</a>
	)
}

function encodeUriParams(params: { [key: string]: string }) {
	return Object.entries(params)
		.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
		.join("&")
}
