import { QueryKey, useInfiniteQuery, useQuery } from "react-query"
import { useSessionQuery } from "../auth/queries"
import { encodeUriParams, UriParamsObject } from "../helpers/encodeUriParams"
import type { ListingResponse } from "./types"

async function redditFetch<T>(
	endpoint: string,
	token: string | undefined,
	params: UriParamsObject = {},
): Promise<T> {
	const url = new URL(
		token ? `https://oauth.reddit.com` : `https://www.reddit.com`,
	)
	url.pathname = endpoint
	url.search = encodeUriParams(params)

	const headers: { [header: string]: string } = {
		"User-Agent": import.meta.env.VITE_REDDIT_USER_AGENT!,
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
	const { data, isLoading } = useSessionQuery()
	const token = data?.redditAccessToken

	return useQuery<T>({
		queryKey: queryKey ? [...queryKey, token] : ["reddit", endpoint, token],
		enabled: !isLoading,
		async queryFn() {
			return redditFetch<T>(endpoint, token)
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
	const { data, isLoading } = useSessionQuery()
	const token = data?.redditAccessToken

	return useInfiniteQuery<ListingResponse<T>>({
		queryKey: queryKey
			? [...queryKey, token]
			: ["redditListing", token, { endpoint }],

		enabled: !isLoading,

		async queryFn({ pageParam }) {
			return redditFetch(endpoint, token, { after: pageParam })
		},

		getNextPageParam(response) {
			return response.data.after
		},
	})
}
