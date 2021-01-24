import { Link } from "react-router-dom"

export function HomePage() {
	return (
		<>
			<p>am home</p>
			<Link to="/home">go home</Link>
		</>
	)
}
