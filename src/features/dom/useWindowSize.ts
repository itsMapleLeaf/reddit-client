import { useLayoutEffect, useState } from "react"
import { useEventTarget } from "./useEventTarget"

export function useWindowSize() {
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)

	const updateSize = () => {
		setWidth(window.innerWidth)
		setHeight(window.innerHeight)
	}

	useLayoutEffect(updateSize, [])
	useEventTarget(window, "resize", updateSize)

	return { width, height }
}
