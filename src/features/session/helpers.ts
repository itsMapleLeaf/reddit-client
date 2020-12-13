import { serialize } from "cookie"
import { NextApiRequest, NextApiResponse } from "next"
import { RedditAuthData } from "../reddit/helpers"

type ApiSession = {
	redditAuth: RedditAuthData
	expirationDate: number
}

const sessionKey = "clientSession"

export function getSession(req: NextApiRequest): ApiSession | undefined {
	const value = req.cookies[sessionKey]
	return value && JSON.parse(value)
}

export function setSession(res: NextApiResponse, redditAuth: RedditAuthData) {
	const session: ApiSession = {
		redditAuth,
		expirationDate: Date.now() + redditAuth.expires_in * 1000 - 5 * 60 * 1000,
	}

	res.setHeader(
		"Set-Cookie",
		serialize(sessionKey, JSON.stringify(session), {
			httpOnly: true,
			sameSite: true,
			path: "/",
		}),
	)
}

export function clearSession(res: NextApiResponse) {
	res.setHeader(
		"Set-Cookie",
		serialize(sessionKey, "", {
			httpOnly: true,
			sameSite: true,
			path: "/",
		}),
	)
}