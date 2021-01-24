import { ReactNode, useEffect, useState } from "react"
import ReactDOM from "react-dom"

export default function Portal({ children }: { children: ReactNode }) {
	const [element, setElement] = useState<Element>()

	useEffect(() => {
		const element = document.createElement("react-portal")
		document.body.append(element)
		setElement(element)
		return () => element.remove()
	}, [])

	return element ? ReactDOM.createPortal(children, element) : null
}