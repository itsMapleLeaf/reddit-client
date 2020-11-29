import { useRoute } from "../router"
import { Home } from "./Home"

export function LoggedInRoutes() {
	const route = useRoute()
	if (route.name === "home") return <Home />
	return null
}
