import { useEffectRef } from "features/react/useEffectRef"
import { useEffect, useRef } from "react"
import { useIntersection, useWindowSize } from "react-use"
import "twin.macro"

function InfiniteScrollCursor(props: { onEndReached?: () => void }) {
	const ref = useRef<HTMLDivElement>(null)
	const entry = useIntersection(ref, {})
	const propsRef = useEffectRef(props)
	const { height } = useWindowSize()

	useEffect(() => {
		if (entry?.isIntersecting) propsRef.current.onEndReached?.()
	}, [entry?.isIntersecting, propsRef])

	return (
		<div tw="relative">
			<div
				tw="absolute bottom-0 left-0 w-px"
				style={{ height: height * 2 }}
				ref={ref}
			/>
		</div>
	)
}

export default InfiniteScrollCursor
