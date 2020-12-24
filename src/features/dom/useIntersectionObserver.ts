import { useEffectRef } from "features/react/useEffectRef"
import { useEffect, useState } from "react"
import useMemoValue from "use-memo-value"

export function useIntersectionObserver(
	callback: IntersectionObserverCallback,
	optionsArg?: IntersectionObserverInit,
) {
	const [element, ref] = useState<Element | null>()
	const callbackRef = useEffectRef(callback)
	const options = useMemoValue(optionsArg)

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
