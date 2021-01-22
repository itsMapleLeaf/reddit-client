import Router from "@koa/router"
import * as z from "zod"
import { fetchAccessToken, fetchRefreshedTokens } from "./reddit-auth"
import { clearSession, getSession, setSession } from "./session"

export const authRoutes = new Router()

authRoutes.post("/login", async (ctx) => {
	const schema = z.object({
		authCode: z.string(),
	})

	const body = schema.parse(ctx.request.body)

	const redditAuth = await fetchAccessToken(body.authCode)
	setSession(ctx, redditAuth)
	ctx.body = { success: true }
})

authRoutes.post("/logout", async (ctx) => {
	clearSession(ctx)
	ctx.body = { success: true }
})

authRoutes.get("/session", async (ctx) => {
	let session = getSession(ctx)

	if (!session) {
		ctx.body = { session: undefined }
		return
	}

	if (Date.now() > session.expirationDate) {
		const redditAuth = await fetchRefreshedTokens(
			session.redditAuth.refresh_token,
		)

		session = setSession(ctx, redditAuth)
	}

	ctx.body = {
		session: {
			redditAccessToken: session.redditAuth.access_token,
		},
	}
})
