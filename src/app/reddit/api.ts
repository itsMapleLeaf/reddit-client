import { useInfiniteQuery, useQuery } from "react-query"
import { useSessionQuery } from "../client-session"
import { encodeUriParams, UriParamsObject } from "../common/url"
import { ListingResponse } from "./types"

const redditErrorUnauthenticated = Symbol("unauthenticated")
const redditErrorUnauthorized = Symbol("unauthorized")

async function redditFetch<T>(
	endpoint: string,
	token: string | undefined,
	params?: UriParamsObject,
): Promise<T> {
	const url = new URL(
		token ? `https://oauth.reddit.com` : `https://www.reddit.com`,
	)
	url.pathname = endpoint
	url.search = params ? `?${encodeUriParams(params)}` : ""

	const headers: { [header: string]: string } = {
		"User-Agent": "web:net.kingdaro.awesomeredditapp:v0.0.0 (by /u/kingdaro)",
		// "Content-Type": "application/json",
	}

	if (token) {
		headers.Authorization = `Bearer ${token}`
	}

	const res = await fetch(url.toString(), {
		headers,
	})

	if (res.status === 401) throw redditErrorUnauthenticated
	if (res.status === 403) throw redditErrorUnauthorized

	if (!res.ok) {
		throw new Error(`An error occurred (${res.status})`)
	}

	return res.json()
}

export function useRedditQuery<T>(endpoint: string) {
	const session = useSessionQuery()
	const token = session.data?.session?.redditAccessToken

	return useQuery<T>({
		queryKey: ["redditQuery", endpoint, token],
		async queryFn() {
			return redditFetch<T>(endpoint, token)
		},
	})
}

export function useRedditInfiniteQuery<T extends ListingResponse>(
	endpoint: string,
) {
	const session = useSessionQuery()
	const token = session.data?.session?.redditAccessToken

	return useInfiniteQuery<T>({
		queryKey: ["redditInfiniteQuery", endpoint, token],
		async queryFn({ pageParam }) {
			return redditFetch<T>(endpoint, token, {
				limit: 10,
				after: pageParam,
			})
		},
		getNextPageParam(response) {
			return response.data.after
		},
	})
}
