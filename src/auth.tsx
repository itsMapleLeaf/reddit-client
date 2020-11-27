import { useQuery } from "react-query"
import { redditAppId, redditAppSecret } from "./env"
import { redirectUri } from "./reddit"
import { encodeUriParams } from "./url"

export function AuthRedirectHandler(props: { authCode: string }) {
	const { isSuccess, isError } = useQuery(
		["getAuthToken", props.authCode],
		() => {
			const authCredentials = btoa(`${redditAppId}:${redditAppSecret}`)
			const controller = new AbortController()

			const promise = fetch(`https://www.reddit.com/api/v1/access_token`, {
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
				signal: controller.signal,
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(`Request failed`)
					}
					return res.json()
				})
				.then((data) => {
					if (data.error) {
						throw new Error(`Auth failed: ${data.error}`)
					}
					return data
				})

			;(promise as any).cancel = () => controller.abort()

			return promise
		},
	)

	if (isSuccess) {
		return <p>Success!</p>
	}

	if (isError) {
		return <p>An error occurred</p>
	}

	return <p>Logging in...</p>
}
