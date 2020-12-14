import { encodeUriParams, UriParamsObject } from "helpers/uri"
import { useInfiniteQuery, useQuery } from "react-query"
import { useSessionQuery } from "../session/queries"
import { getRedditAppUserAgent } from "./helpers"
import { ListingResponse, Post } from "./types"

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
	if (params) url.search = encodeUriParams(params)

	const headers: { [header: string]: string } = {
		"User-Agent": getRedditAppUserAgent(),
	}

	if (token) headers.Authorization = `Bearer ${token}`

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

function useRedditListingQuery<T>(key: string, endpoint: string) {
	const session = useSessionQuery()
	const token = session.data?.session?.redditAccessToken

	return useInfiniteQuery<ListingResponse<T>>({
		queryKey: [key, endpoint, token],
		async queryFn({ pageParam }) {
			return redditFetch(endpoint, token, {
				after: pageParam,
			})
		},
		getNextPageParam(response) {
			return response.data.after
		},
	})
}

export function useRedditHotQuery() {
	return useRedditListingQuery<Post>("hotListing", "/hot.json")
}

export function useRedditNewQuery() {
	return useRedditListingQuery<Post>("newListing", "/new.json")
}
