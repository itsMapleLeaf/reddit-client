import { useEffect } from "preact/hooks"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { useSearchParam } from "../routing/use-param"

export function AuthRedirect() {
	const navigate = useNavigate()
	const code = useSearchParam("code")

	const { mutate } = useMutation(
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
				navigate("/", { replace: true })
			},
		},
	)

	useEffect(() => {
		if (code) mutate(code)
	}, [mutate, code])

	return <p>Logging in...</p>
}
