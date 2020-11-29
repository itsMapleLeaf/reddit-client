import { ComponentChildren, createContext } from "preact"
import { useContext } from "preact/hooks"
import { useQuery } from "react-query"
import { raise } from "../common/error"

type Session = {
	redditAccessToken: string
}

export function useSessionQuery() {
	return useQuery<{ session: Session }>(
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
		{
			retry: false,
			refetchInterval: 30 * 60 * 1000, // 30 minutes
		},
	)
}

const Context = createContext<Session | undefined>(undefined)

export function SessionProvider(props: {
	session: Session
	children: ComponentChildren
}) {
	return (
		<Context.Provider value={props.session}>{props.children}</Context.Provider>
	)
}

export function useSessionContext() {
	return useContext(Context) || raise("Session context not found")
}
