import { encodeUriParams } from "../helpers/encodeUriParams"
import { raise } from "../helpers/raise"
import { buttonSolid } from "../ui/components"

const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?${encodeUriParams(
	{
		client_id: import.meta.env.VITE_REDDIT_APP_ID ?? raise(),
		response_type: `code`,
		state: `.`,
		redirect_uri: import.meta.env.VITE_REDDIT_APP_REDIRECT_URI ?? raise(),
		duration: `permanent`,
		scope: "identity read",
	},
)}`

export function RedditLoginButton() {
	return (
		<a href={redditAuthUrl} className={buttonSolid}>
			Login with reddit
		</a>
	)
}
