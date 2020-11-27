import { useEffect } from "preact/hooks"
import { redditAppId, redditAppSecret } from "./env"
import { redirectUri } from "./reddit"
import { encodeUriParams } from "./url"

export function AuthRedirectHandler(props: { authCode: string }) {
	const authCredentials = btoa(`${redditAppId}:${redditAppSecret}`)

	useEffect(() => {
		fetch(`https://www.reddit.com/api/v1/access_token`, {
			method: "post",
			headers: {
				"Authorization": `Basic ${authCredentials}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: encodeUriParams({
				grant_type: "authorization_code",
				code: props.authCode,
				redirect_uri: redirectUri,
			}),
		})
			.then((res) => res.json())
			.then(console.log)
	}, [])

	return <p>etc.</p>
}
