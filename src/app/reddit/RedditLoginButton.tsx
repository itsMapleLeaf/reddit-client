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

export default function RedditLoginButton() {
	return (
		<a href={redditAuthUrl} className="button-solid">
			Login with reddit
		</a>
	)
}
