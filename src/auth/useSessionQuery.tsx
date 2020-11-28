import { useQuery } from "react-query"

type SessionResponse = {
	redditTokens: { access_token: string; refresh_token: string }
}

export function useSessionQuery() {
	return useQuery<SessionResponse>(
		["session"],
		async () => {
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
		{ retry: false },
	)
}
