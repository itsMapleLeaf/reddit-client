import { buttonSolid } from "features/ui/components"
import { encodeUriParams } from "helpers/uri"
import { getRedditAppId, getRedditRedirectUri } from "./helpers"

const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?${encodeUriParams(
	{
		client_id: getRedditAppId(),
		response_type: `code`,
		state: `.`,
		redirect_uri: getRedditRedirectUri(),
		duration: `permanent`,
		scope: "identity read",
	},
)}`

export default function RedditLoginButton() {
	return (
		<a href={redditAuthUrl} className={buttonSolid}>
			Login with reddit
		</a>
	)
}
