import { LoggedInRoutes } from "../app/LoggedInRoutes"
import { encodeUriParams } from "../common/url"
import { redditRedirectUri } from "../reddit"
import { useSessionQuery } from "./useSessionQuery"

export function AuthSwitch() {
	const { data, isLoading } = useSessionQuery()

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
