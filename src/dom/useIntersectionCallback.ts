import { useEffect, useState } from "react"
import useMemoValue from "use-memo-value"
import { useEffectRef } from "../react/useEffectRef"

export function useIntersectionCallback(
	callback: IntersectionObserverCallback,
	optionsArg?: IntersectionObserverInit,
) {
	const [element, ref] = useState<Element | null>()
	const options = useMemoValue(optionsArg)
	const callbackRef = useEffectRef(callback)

	useEffect(() => {
		if (!element) return

		const observer = new IntersectionObserver((...args) => {
			callbackRef.current(...args)
		}, options)

		observer.observe(element)
		return () => observer.disconnect()
	}, [callbackRef, element, options])

	return ref
}
