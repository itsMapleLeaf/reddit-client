import type { Request } from "express"
import type { RedditAuthResponse } from "./reddit-auth"

type ApiSession = {
	redditAuth: RedditAuthResponse
	expirationDate: number
}

declare global {
	namespace CookieSessionInterfaces {
		interface CookieSessionObject {
			apiSession?: ApiSession
		}
	}
}

export function getSession(req: Request): ApiSession | undefined {
	return req.session?.apiSession
}

export function setSession(
	req: Request,
	redditAuth: RedditAuthResponse,
): ApiSession {
	return (req.session!.apiSession ??= {
		redditAuth,
		expirationDate: Date.now() + redditAuth.expires_in * 1000,
	})
}

export function clearSession(req: Request) {
	req.session = null
}
