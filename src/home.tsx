import { Link } from "react-router-dom"

export function Home() {
	return (
		<>
			<p>am home</p>
			<Link to="/home">go home</Link>
		</>
	)
}
