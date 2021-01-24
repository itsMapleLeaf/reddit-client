import { useEffect, useState } from "react"
import useMemoValue from "use-memo-value"

export function useIntersectionCallback(
	callback: IntersectionObserverCallback,
	optionsArg?: IntersectionObserverInit,
) {
	const [element, ref] = useState<Element | null>()
	const options = useMemoValue(optionsArg)

	useEffect(() => {
		if (!element) return

		const observer = new IntersectionObserver(callback, options)
		observer.observe(element)
		return () => observer.disconnect()
	}, [callback, element, options])

	return ref
}
