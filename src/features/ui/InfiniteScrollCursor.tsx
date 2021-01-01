import { useEffectRef } from "features/react/useEffectRef"
import { useEffect, useRef } from "react"
import { useIntersection, useWindowSize } from "react-use"
import { tw } from "twind"

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
		<div className={tw`relative`}>
			<div
				className={tw`absolute bottom-0 left-0 w-px`}
				style={{ height: height * 2 }}
				ref={ref}
				// the height will differ between client and server, so suppress the warning
				// not sure if there's a better way around this?
				suppressHydrationWarning
			/>
		</div>
	)
}
