import { useMutation } from "react-query"
import { buttonSolid } from "../ui/components"
import { useSessionQuery } from "./queries"
import { RedditLoginButton } from "./reddit-login-button"

export function AuthButton() {
	const session = useSessionQuery()

	const { mutate: logout } = useMutation(
		async () => {
			const res = await fetch(`/api/logout`, { credentials: "include" })
			return res.json()
		},
		{
			onSuccess: () => window.location.reload(),
		},
	)

	if (session.isLoading) {
		return null
	}

	if (!session.data) {
		return <RedditLoginButton />
	}

	return (
		<button type="button" className={buttonSolid} onClick={() => logout()}>
			Log out
		</button>
	)
}
