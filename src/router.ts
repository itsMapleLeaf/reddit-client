import { useEffect, useState } from "preact/hooks"
import { createRouter, defineRoute, param } from "type-route"

const router = createRouter({
	home: defineRoute("/"),

	authRedirect: defineRoute(
		{ code: param.query.string },
		() => "/auth_redirect",
	),
})

export function useRoute() {
	const [route, setRoute] = useState(router.session.getInitialRoute())
	useEffect(() => router.session.listen(setRoute))
	return route
}
