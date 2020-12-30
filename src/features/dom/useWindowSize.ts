import { useLayoutEffect, useState } from "react"
import { useWindowEvent } from "./useDomEvent"

export function useWindowSize() {
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)

	const updateSize = () => {
		setWidth(window.innerWidth)
		setHeight(window.innerHeight)
	}

	useLayoutEffect(updateSize, [])
	useWindowEvent("resize", updateSize)

	return { width, height }
}
