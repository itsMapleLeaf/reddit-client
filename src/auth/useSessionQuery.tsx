import { useQuery } from "react-query"
import { sessionDtoSchema } from "./schemas"

export function useSessionQuery() {
	return useQuery(
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

			return sessionDtoSchema.parse(data)
		},
		{ retry: false },
	)
}
