import { serialize } from "cookie"
import { Context } from "koa"
import * as qs from "querystring"
import { RedditAuthResponse } from "./reddit-auth"

let session
type ApiSession = {
	redditAuth: RedditAuthResponse
	expirationDate: number
}
const sessionKey = "clientSession"

export function getSession(ctx: Context): ApiSession | undefined {
	const value = ctx.cookies.get(sessionKey)
	return value && JSON.parse(qs.unescape(value))
}

export function setSession(ctx: Context, redditAuth: RedditAuthResponse) {
	const session: ApiSession = {
		redditAuth,
		expirationDate: Date.now() + redditAuth.expires_in * 1000,
	}

	ctx.set(
		"Set-Cookie",
		serialize(sessionKey, JSON.stringify(session), {
			httpOnly: true,
			sameSite: true,
			path: "/",
		}),
	)

	return session
}

export function clearSession(ctx: Context) {
	ctx.set(
		"Set-Cookie",
		serialize(sessionKey, "", {
			httpOnly: true,
			sameSite: true,
			path: "/",
		}),
	)
}
