import { useEffect } from "preact/hooks"
import { redditAuthUrl, redirectUri } from "./reddit"
import { useRoute } from "./router"
import { encodeUriParams } from "./url"

export const App = () => {
	const route = useRoute()

	if (route.name === "authRedirect") {
		return <AuthRedirectHandler authCode={route.params.code} />
	}

	if (route.name === "home") {
		return (
			<main>
				<a href={redditAuthUrl}>Login</a>
			</main>
		)
	}

	return null
}

function AuthRedirectHandler(props: { authCode: string }) {
	const { VITE_REDDIT_APP_ID, VITE_REDDIT_APP_SECRET } = import.meta.env
	const authCredentials = btoa(
		`${VITE_REDDIT_APP_ID}:${VITE_REDDIT_APP_SECRET}`,
	)

	useEffect(() => {
		fetch(`https://www.reddit.com/api/v1/access_token`, {
			method: "post",
			headers: {
				Authorization: `Basic ${authCredentials}`,
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
