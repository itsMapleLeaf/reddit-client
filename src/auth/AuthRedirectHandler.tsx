import { useEffect } from "preact/hooks"
import { useMutation } from "react-query"
import { routes } from "../router"
import { LoginBody } from "./schemas"

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

function useLoginMutation() {
	return useMutation(
		async (authCode: string) => {
			const body: LoginBody = { authCode }

			const res = await fetch(`/api/login`, {
				method: "post",
				body: JSON.stringify(body),
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
