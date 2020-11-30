import { LoggedInRoutes } from "../app/LoggedInRoutes"
import { encodeUriParams } from "../common/url"
import { redditAppId, redditRedirectUri } from "../env"
import { SessionProvider, useSessionQuery } from "./session"

export function AuthSwitch() {
	const { data, isLoading } = useSessionQuery()

	if (isLoading) {
		return <p>Loading...</p>
	}

	const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?${encodeUriParams(
		{
			client_id: redditAppId,
			response_type: `code`,
			state: `.`,
			redirect_uri: redditRedirectUri,
			duration: `permanent`,
			scope: "identity read",
		},
	)}`

	return data?.session ? (
		<SessionProvider session={data.session}>
			<LoggedInRoutes />
		</SessionProvider>
	) : (
		<main class="p-4 container mx-auto">
			<a
				href={redditAuthUrl}
				class="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-3 rounded inline-block font-medium tracking-wide leading-none shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-200"
			>
				Login
			</a>
		</main>
	)
}
