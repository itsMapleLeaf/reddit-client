import { useSessionQuery } from "../client/client-session"
import { encodeUriParams } from "../common/url"
import { redditAppId, redditRedirectUri } from "../env"

const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?${encodeUriParams(
	{
		client_id: redditAppId(),
		response_type: `code`,
		state: `.`,
		redirect_uri: redditRedirectUri(),
		duration: `permanent`,
		scope: "identity read",
	},
)}`

export default function Home() {
	const { data, isLoading } = useSessionQuery()

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (!data?.session) {
		return (
			<main className="container p-4 mx-auto">
				<a
					href={redditAuthUrl}
					className="inline-block p-3 font-medium leading-none tracking-wide text-white transition duration-200 rounded shadow-md bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
				>
					Login
				</a>
			</main>
		)
	}

	return <p>you&apos;re in 👍</p>
}
