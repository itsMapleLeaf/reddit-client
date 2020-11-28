import { useEffect } from "preact/hooks"
import { useMutation, useQuery } from "react-query"
import { LoggedInRoutes } from "./app"
import { redditRedirectUri } from "./reddit"
import { routes } from "./router"
import { encodeUriParams } from "./url"

export function AuthRedirectHandler(props: { authCode: string }) {
	const { mutate, isSuccess, isError } = useLoginMutation()

	useEffect(() => {
		mutate(props.authCode)
	}, [mutate, props.authCode])

	if (isSuccess) {
		return <p>Success!</p>
	}

	if (isError) {
		return <p>An error occurred</p>
	}

	return <p>Logging in...</p>
}

export function AuthSwitch() {
	const { data, isLoading } = useSessionQuery()

	if (isLoading) {
		return <p>Loading...</p>
	}

	const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?${encodeUriParams(
		{
			client_id: import.meta.env.VITE_REDDIT_APP_ID!,
			response_type: `code`,
			state: `.`,
			redirect_uri: redditRedirectUri,
			duration: `permanent`,
			scope: "identity read",
		},
	)}`

	return data.session ? <LoggedInRoutes /> : <a href={redditAuthUrl}>Login</a>
}

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

			return await data
		},
		{ retry: false },
	)
}

function useLoginMutation() {
	return useMutation(
		async (authCode: string) => {
			const res = await fetch(`/api/login`, {
				method: "post",
				body: JSON.stringify({ authCode }),
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
			onSuccess: () => {
				routes.home().replace()
			},
		},
	)
}
