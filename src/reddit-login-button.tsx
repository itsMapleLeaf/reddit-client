// import {buttonSolid} from 'features/ui/components';
// import {encodeUriParams} from 'helpers/uri';
import { encodeUriParams } from "./helpers/uri"

const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?${encodeUriParams(
	{
		client_id: import.meta.env.VITE_REDDIT_APP_ID,
		response_type: `code`,
		state: `.`,
		redirect_uri: import.meta.env.VITE_REDDIT_APP_REDIRECT_URI,
		duration: `permanent`,
		scope: "identity read",
	},
)}`

export function RedditLoginButton() {
	return (
		<a href={redditAuthUrl} /* className={buttonSolid} */>Login with reddit</a>
	)
}
