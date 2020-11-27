import { AuthRedirectHandler } from "./auth"
import { redditAuthUrl } from "./reddit"
import { useRoute } from "./router"

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
