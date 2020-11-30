import { createRouter, defineRoute, param } from "type-route"
import { redditRedirectUri } from "./env"

export const { routes, RouteProvider, useRoute } = createRouter({
	home: defineRoute("/"),

	authRedirect: defineRoute(
		{ code: param.query.string },
		() => new URL(redditRedirectUri).pathname,
	),
})
