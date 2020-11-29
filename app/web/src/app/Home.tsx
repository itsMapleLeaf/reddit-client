import { useQuery } from "react-query"
import { useSessionContext } from "../auth/session"
import { ListingResponse } from "../reddit/listing"

export function Home() {
	const { data, error, isLoading } = useRedditHotQuery()

	return (
		<main>
			{isLoading && <p>Loading...</p>}
			{error && <p>{String(error)}</p>}
			{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
		</main>
	)
}

function useRedditHotQuery() {
	const session = useSessionContext()
	return useQuery<ListingResponse>(
		["hot", session.redditTokens.access_token],
		async () => {
			const res = await fetch(`https://oauth.reddit.com/hot`, {
				headers: {
					"Authorization": `Bearer ${session.redditTokens.access_token}`,
					"Content-Type": "application/json",
				},
			})

			if (!res.ok) {
				throw new Error(`An error occurred (${res.status})`)
			}

			return res.json()
		},
	)
}
