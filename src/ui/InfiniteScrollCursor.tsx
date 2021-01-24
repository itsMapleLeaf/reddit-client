import "@twind/macro"
import { useWindowSize } from "react-use"
import { useIntersectionCallback } from "../dom/useIntersectionCallback"

export function InfiniteScrollCursor({
	onEndReached,
}: {
	onEndReached?: () => void
}) {
	const ref = useIntersectionCallback(([entry]) => {
		if (entry?.isIntersecting) onEndReached?.()
	})

	const { height } = useWindowSize(0, 0)

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
