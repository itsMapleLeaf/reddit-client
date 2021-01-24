import fetch from "isomorphic-fetch"
import { encodeUriParams, UriParamsObject } from "../src/helpers/uri"
import {
	getRedditAppId,
	getRedditAppSecret,
	getRedditAppUserAgent,
	getRedditRedirectUri,
} from "./env"

export type RedditAuthResponse = {
	access_token: string
	refresh_token: string
	expires_in: number
}

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
