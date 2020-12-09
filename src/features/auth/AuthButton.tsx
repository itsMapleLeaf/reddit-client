import RedditLoginButton from "features/reddit/RedditLoginButton"
import { useSessionQuery } from "features/session/queries"
import { useRouter } from "next/router"
import { useMutation } from "react-query"

export default function AuthButton() {
	const session = useSessionQuery()
	const router = useRouter()

	const { mutate: logout } = useMutation(
		async () => {
			const res = await fetch(`/api/logout`, { credentials: "include" })
			return res.json()
		},
		{
			onSuccess: () => router.reload(),
		},
	)

	if (session.isLoading) {
		return null
	}

	if (!session.data?.session) {
		return <RedditLoginButton />
	}

	return (
		<button type="button" class="button-solid" onClick={() => logout()}>
			Log out
		</button>
	)
}
