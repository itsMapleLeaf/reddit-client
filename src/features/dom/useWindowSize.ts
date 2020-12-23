import { useLayoutEffect, useState } from "react"
import { useDomEvent } from "./useDomEvent"

export function useWindowSize() {
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)

	const updateSize = () => {
		setWidth(window.innerWidth)
		setHeight(window.innerHeight)
	}

	useLayoutEffect(updateSize, [])
	useDomEvent(window, "resize", updateSize)

	return { width, height }
}
