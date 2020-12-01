import fetch from "isomorphic-fetch"
import * as env from "../env"

export type RedditAuthData = {
	access_token: string
	refresh_token: string
	expires_in: number
}

export function getAccessToken(authCode: string) {
	return authFetch({
		grant_type: "authorization_code",
		code: authCode,
		redirect_uri: env.redditRedirectUri(),
	})
}

export function getRefreshedTokens(refreshToken: string) {
	return authFetch({
		grant_type: "refresh_token",
		refresh_token: refreshToken,
	})
}

async function authFetch(body: UriParamsObject): Promise<RedditAuthData> {
	const authCredentials = Buffer.from(
		`${env.redditAppId()}:${env.redditAppSecret()}`,
	).toString("base64")

	const response = await fetch(`https://www.reddit.com/api/v1/access_token`, {
		method: "post",
		headers: {
			"Authorization": `Basic ${authCredentials}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: encodeUriParams(body),
	})

	const data = await response.json()

	if (!response.ok || data.error) {
		throw new Error(`Auth failed: ${data.error}`)
	}

	return data
}

type UriParamsObject = {
	[key: string]: string | number | boolean
}

function encodeUriParams(params: UriParamsObject) {
	return Object.entries(params)
		.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
		.join("&")
}
