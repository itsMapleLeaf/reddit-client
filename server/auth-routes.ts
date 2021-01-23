import Router from "express-promise-router"
import * as z from "zod"
import { fetchAccessToken, fetchRefreshedTokens } from "./reddit-auth"
import { clearSession, getSession, setSession } from "./session"

export const authRoutes = Router()

authRoutes.post("/login", async (req, res) => {
	const schema = z.object({
		authCode: z.string(),
	})

	const body = schema.parse(req.body)

	const redditAuth = await fetchAccessToken(body.authCode)
	setSession(res, redditAuth)
	res.json({ success: true })
})

authRoutes.post("/logout", async (req, res) => {
	clearSession(res)
	res.json({ success: true })
})

authRoutes.get("/session", async (req, res) => {
	let session = getSession(req)

	if (!session) {
		res.json({ session: undefined })
		return
	}

	if (Date.now() > session.expirationDate) {
		const redditAuth = await fetchRefreshedTokens(
			session.redditAuth.refresh_token,
		)

		session = setSession(res, redditAuth)
	}

	res.json({
		session: {
			redditAccessToken: session.redditAuth.access_token,
		},
	})
})
