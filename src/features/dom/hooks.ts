import { useEffect, useLayoutEffect, useState } from "react"

export function useWindowSize() {
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)

	const updateSize = () => {
		setWidth(window.innerWidth)
		setHeight(window.innerHeight)
	}

	useLayoutEffect(updateSize, [])

	useEffect(() => {
		window.addEventListener("resize", updateSize)
		return () => window.removeEventListener("resize", updateSize)
	})

	return { width, height }
}
