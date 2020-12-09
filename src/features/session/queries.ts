import { useQuery } from "react-query"

type ClientSession = {
	redditAccessToken: string
}

export function useSessionQuery() {
	return useQuery<{ session?: ClientSession }>({
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
		refetchInterval: 30 * 60 * 1000, // fetch again after 30 minutes
	})
}
