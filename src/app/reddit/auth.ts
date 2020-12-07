import { encodeUriParams, UriParamsObject } from "app/common/url"
import fetch from "isomorphic-fetch"
import * as constants from "./constants"

export type RedditAuthData = {
	access_token: string
	refresh_token: string
	expires_in: number
}

export function getAccessToken(authCode: string) {
	return authFetch({
		grant_type: "authorization_code",
		code: authCode,
		redirect_uri: constants.redditRedirectUri(),
	})
}

export async function getRefreshedTokens(
	refreshToken: string,
): Promise<RedditAuthData> {
	const result: Omit<RedditAuthData, "refresh_token"> = await authFetch({
		grant_type: "refresh_token",
		refresh_token: refreshToken,
	})
	return { ...result, refresh_token: refreshToken }
}

async function authFetch(body: UriParamsObject): Promise<RedditAuthData> {
	const authCredentials = `${constants.redditAppId()}:${constants.redditAppSecret()}`

	const response = await fetch(`https://www.reddit.com/api/v1/access_token`, {
		method: "post",
		headers: {
			"Authorization": `Basic ${Buffer.from(authCredentials).toString(
				"base64",
			)}`,
			"Content-Type": "application/x-www-form-urlencoded",
			"User-Agent": constants.redditAppUserAgent(),
		},
		body: encodeUriParams(body),
	})

	const data = await response.json()

	if (!response.ok || data.error) {
		throw new Error(`Auth failed: ${data.error}`)
	}

	return data
}
