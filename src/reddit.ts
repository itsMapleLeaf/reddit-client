import { redditAppId } from "./env"
import { encodeUriParams } from "./url"

export const redirectUri = `http://localhost:3000/auth_redirect`

export const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?${encodeUriParams(
	{
		client_id: redditAppId,
		response_type: `code`,
		state: `.`,
		redirect_uri: redirectUri,
		duration: `permanent`,
		scope: "identity read",
	},
)}`
