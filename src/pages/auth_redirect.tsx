import { useRouter } from "next/dist/client/router"
import { useEffect } from "react"
import { useMutation } from "react-query"

export default function AuthRedirect() {
	const router = useRouter()

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
				router.replace("/")
			},
		},
	)

	useEffect(() => {
		if (router.query.code) {
			mutate(String(router.query.code))
		}
	}, [mutate, router.query.code])

	return <p>Logging in...</p>
}
