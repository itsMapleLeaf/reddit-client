import { encodeUriParams, UriParamsObject } from "helpers/uri"
import { QueryKey, useInfiniteQuery, useQuery } from "react-query"
import { fetchSession } from "../session/queries"
import { getRedditAppUserAgent } from "./helpers"
import { ListingResponse } from "./types"

async function redditFetch<T>(
	endpoint: string,
	params: UriParamsObject = {},
): Promise<T> {
	const token = (await fetchSession())?.redditAccessToken

	const url = new URL(
		token ? `https://oauth.reddit.com` : `https://www.reddit.com`,
	)
	url.pathname = endpoint
	url.search = encodeUriParams(params)

	const headers: { [header: string]: string } = {
		"User-Agent": getRedditAppUserAgent(),
		...(token && { Authorization: `Bearer ${token}` }),
	}

	const response = await fetch(url.toString(), { headers })
	const data = await response.json()

	if (!response.ok || data?.error) {
		const defaultMessage = `Fetch failed: ${response.statusText} (${response.status})`
		throw new Error(data?.message || defaultMessage)
	}

	return data
}

export function useRedditQuery<T>({
	endpoint,
	queryKey,
}: {
	endpoint: string
	queryKey?: QueryKey
}) {
	return useQuery<T>({
		queryKey: queryKey ?? ["reddit", endpoint],
		async queryFn() {
			return redditFetch<T>(endpoint)
		},
	})
}

export function useRedditListingQuery<T>({
	endpoint,
	queryKey,
}: {
	endpoint: string
	queryKey?: QueryKey
}) {
	return useInfiniteQuery<ListingResponse<T>>({
		queryKey: queryKey ?? ["redditListing", { endpoint }],
		async queryFn({ pageParam }) {
			return redditFetch(endpoint, { after: pageParam })
		},
		getNextPageParam(response) {
			return response.data.after
		},
	})
}
