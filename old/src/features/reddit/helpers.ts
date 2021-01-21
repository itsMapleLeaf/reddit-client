import { raise } from "helpers/error"
import { encodeUriParams, UriParamsObject } from "helpers/uri"
import fetch from "isomorphic-fetch"

export type RedditAuthResponse = {
	access_token: string
	refresh_token: string
	expires_in: number
}

export const getRedditAppId = () =>
	process.env.NEXT_PUBLIC_REDDIT_APP_ID ||
	raise("env NEXT_PUBLIC_REDDIT_APP_ID not defined")

export const getRedditRedirectUri = () =>
	process.env.NEXT_PUBLIC_REDDIT_APP_REDIRECT_URI ||
	raise("env NEXT_PUBLIC_REDDIT_APP_REDIRECT_URI not defined")

export const getRedditAppSecret = () =>
	process.env.REDDIT_APP_SECRET || raise("env REDDIT_APP_SECRET not defined")

export const getRedditAppUserAgent = () =>
	process.env.NEXT_PUBLIC_REDDIT_USER_AGENT ||
	raise("env NEXT_PUBLIC_REDDIT_USER_AGENT not defined")

export function fetchAccessToken(authCode: string) {
	return authFetch({
		grant_type: "authorization_code",
		code: authCode,
		redirect_uri: getRedditRedirectUri(),
	})
}

export async function fetchRefreshedTokens(
	refreshToken: string,
): Promise<RedditAuthResponse> {
	const result: Omit<RedditAuthResponse, "refresh_token"> = await authFetch({
		grant_type: "refresh_token",
		refresh_token: refreshToken,
	})
	return { ...result, refresh_token: refreshToken }
}

async function authFetch(body: UriParamsObject): Promise<RedditAuthResponse> {
	const authCredentials = `${getRedditAppId()}:${getRedditAppSecret()}`

	const response = await fetch(`https://www.reddit.com/api/v1/access_token`, {
		method: "post",
		headers: {
			"Authorization": `Basic ${Buffer.from(authCredentials).toString(
				"base64",
			)}`,
			"Content-Type": "application/x-www-form-urlencoded",
			"User-Agent": getRedditAppUserAgent(),
		},
		body: encodeUriParams(body),
	})

	const data = await response.json()

	if (!response.ok || data.error) {
		throw new Error(`Auth failed: ${data.error}`)
	}

	return data
}
