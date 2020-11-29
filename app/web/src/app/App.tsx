import { AuthRedirectHandler } from "../auth/AuthRedirectHandler"
import { AuthSwitch } from "../auth/AuthSwitch"
import { useRoute } from "../router"

export function App() {
	const route = useRoute()

	if (route.name === "authRedirect") {
		return <AuthRedirectHandler authCode={route.params.code} />
	}

	return <AuthSwitch />
}
