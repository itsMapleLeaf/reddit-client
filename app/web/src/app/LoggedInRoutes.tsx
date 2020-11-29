import { useRoute } from "../router"

export function LoggedInRoutes() {
	const route = useRoute()

	if (route.name === "home") {
		return <main>hi</main>
	}

	return null
}
