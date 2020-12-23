import { useQuery } from "react-query"

type ClientSession = {
	redditAccessToken: string
}

export async function fetchSession(): Promise<ClientSession | undefined> {
	const res = await fetch(`/api/session`, {
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	})

	const data = await res.json()

	if (!res.ok) {
		throw new Error(data.error || `Request failed`)
	}

	return data?.session
}

export function useSessionQuery() {
	return useQuery({
		queryKey: ["session"],
		queryFn: fetchSession,
		retry: false,
		refetchInterval: 1000 * 60 * 30,
	})
}
