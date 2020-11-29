import { useCallback, useEffect, useState } from "preact/hooks"
import { useQuery } from "react-query"
import { useSessionContext } from "../auth/session"

function useRedditFetch() {
	const session = useSessionContext()

	const [abortController] = useState(() => new AbortController())
	useEffect(() => {
		return () => abortController.abort()
	}, [])

	// remove leading slashes
	return useCallback(
		async <T>(endpoint: string): Promise<T> => {
			const url = `https://oauth.reddit.com/${endpoint.replace(/^\/+/, "")}`

			const res = await fetch(url, {
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
		},
		[session.redditAccessToken, abortController.signal],
	)
}

export function useRedditQuery<T>(endpoint: string) {
	const redditFetch = useRedditFetch()
	return useQuery(["redditQuery", endpoint], () => redditFetch<T>(endpoint))
}
