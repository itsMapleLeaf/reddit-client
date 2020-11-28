import { createRouter, defineRoute, param } from "type-route"

export const { routes, RouteProvider, useRoute } = createRouter({
	home: defineRoute("/"),

	authRedirect: defineRoute(
		{ code: param.query.string },
		() => "/auth_redirect",
	),
})
