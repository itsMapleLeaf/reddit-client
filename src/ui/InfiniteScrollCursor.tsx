import "@twind/macro"
import { useEffect, useRef } from "react"
import { useIntersection, useWindowSize } from "react-use"
import { useEffectRef } from "../react/useEffectRef"

export default function InfiniteScrollCursor(props: {
	onEndReached?: () => void
}) {
	const ref = useRef<HTMLDivElement>(null)
	const entry = useIntersection(ref, {})
	const propsRef = useEffectRef(props)
	const { height } = useWindowSize(0, 0)

	useEffect(() => {
		if (entry?.isIntersecting) propsRef.current.onEndReached?.()
	}, [entry?.isIntersecting, propsRef])

	return (
		<div tw="relative">
			<div
				tw="absolute bottom-0 left-0 w-px"
				style={{ height: height * 2 }}
				ref={ref}
				// the height will differ between client and server, so suppress the warning
				// not sure if there's a better way around this?
				suppressHydrationWarning
			/>
		</div>
	)
}
