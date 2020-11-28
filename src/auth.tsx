import { useEffect } from "preact/hooks"
import { useMutation } from "react-query"
import { useRouterSession } from "./router"

export function AuthRedirectHandler(props: { authCode: string }) {
	const router = useRouterSession()

	const { mutate, isSuccess, isError } = useMutation(
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
				router.replace("/")
			},
		},
	)

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
