import { serialize } from "cookie"
import type { Request, Response } from "express"
import * as qs from "querystring"
import type { RedditAuthResponse } from "./reddit-auth"

type ApiSession = {
	redditAuth: RedditAuthResponse
	expirationDate: number
}
const sessionKey = "clientSession"

export function getSession(req: Request): ApiSession | undefined {
	const value = req.cookies[sessionKey]
	return value && JSON.parse(qs.unescape(value))
}

export function setSession(res: Response, redditAuth: RedditAuthResponse) {
	const session: ApiSession = {
		redditAuth,
		expirationDate: Date.now() + redditAuth.expires_in * 1000,
	}

	res.header(
		"Set-Cookie",
		serialize(sessionKey, JSON.stringify(session), {
			httpOnly: true,
			sameSite: true,
			path: "/",
		}),
	)

	return session
}

export function clearSession(res: Response) {
	res.header(
		"Set-Cookie",
		serialize(sessionKey, "", {
			httpOnly: true,
			sameSite: true,
			path: "/",
		}),
	)
}
