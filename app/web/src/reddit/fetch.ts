import { useEffect, useMemo, useState } from "preact/hooks"
import { useInfiniteQuery, useQuery } from "react-query"
import { useSessionContext } from "../auth/session"
import { encodeUriParams, UriParamsObject } from "../common/url"
import { ListingResponse } from "./listing"

function useRedditFetch() {
	const session = useSessionContext()

	const [abortController] = useState(() => new AbortController())
	useEffect(() => {
		return () => abortController.abort()
	}, [abortController])

	// useCallback broke weirdly with hot reload for some reason ?? ? ????
	return useMemo(() => {
		return async function redditFetch<T>(
			endpoint: string,
			params?: UriParamsObject,
		): Promise<T> {
			const url = new URL(`https://oauth.reddit.com`)
			url.pathname = endpoint
			url.search = params ? `?${encodeUriParams(params)}` : ""

			const res = await fetch(url.toString(), {
				headers: {
					"Authorization": `Bearer ${session.redditAccessToken}`,
					"Content-Type": "application/json",
				},
				signal: abortController.signal,
			})

			if (!res.ok) {
				throw new Error(`An error occurred (${res.status})`)
			}

			return res.json()
		}
	}, [session.redditAccessToken, abortController.signal])
}

export function useRedditQuery<T>(endpoint: string) {
	const redditFetch = useRedditFetch()

	return useQuery<T>({
		queryKey: ["redditQuery", endpoint],
		queryFn: () => redditFetch<T>(endpoint),
	})
}

export function useRedditInfiniteQuery<T extends ListingResponse>(
	endpoint: string,
) {
	const redditFetch = useRedditFetch()

	return useInfiniteQuery<T>({
		queryKey: ["redditInfiniteQuery", endpoint],
		queryFn: ({ pageParam }) => {
			return redditFetch<T>(endpoint, { limit: 10, after: pageParam })
		},
		getNextPageParam: (response) => response.data.after,
	})
}
