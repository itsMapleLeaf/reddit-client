import { AuthRedirectHandler, AuthSwitch } from "./auth"
import { useRoute } from "./router"

export function App() {
	const route = useRoute()

	if (route.name === "authRedirect") {
		return <AuthRedirectHandler authCode={route.params.code} />
	}

	return <AuthSwitch />
}

export function LoggedInRoutes() {
	const route = useRoute()

	if (route.name === "home") {
		return <main>hi</main>
	}

	return null
}
