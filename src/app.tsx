import { useEffect } from "preact/hooks"
import { Logo } from "./logo"

export function App() {
	useEffect(() => {
		fetch("/session", { credentials: "include" })
	}, [])

	return (
		<>
			<Logo />
			<p>Hello Vite + Preact! aaaaaaaa wat</p>
			<p>
				<a
					class="link"
					href="https://preactjs.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn Preact
				</a>
			</p>
		</>
	)
}
