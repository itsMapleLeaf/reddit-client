import { QueryOptions, useQuery } from "react-query"

type ClientSession = {
	redditAccessToken: string
}

export const sessionQuery = (): QueryOptions<{ session?: ClientSession }> => ({
	queryKey: ["session"],
	async queryFn() {
		const res = await fetch(`/api/session`, {
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		})

		const data = await res.json()

		if (!res.ok) {
			throw new Error(data.error || `Request failed`)
		}

		return data
	},
	retry: false,
	cacheTime: 30 * 60 * 1000, // fetch again after 30 minutes
})

export function useSessionQuery() {
	return useQuery({
		...sessionQuery(),
		refetchInterval: 30 * 60 * 1000,
	})
}
