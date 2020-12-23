import { useIntersectionObserver } from "features/dom/useIntersectionObserver"
import { useWindowSize } from "features/dom/useWindowSize"
import { isomorphicComponent } from "helpers/react"
import "twin.macro"

function InfiniteScrollCursor(props: { onEndReached?: () => void }) {
	const ref = useIntersectionObserver(([entry]) => {
		if (entry?.isIntersecting) props.onEndReached?.()
	})

	const windowSize = useWindowSize()

	return (
		<div tw="relative">
			<div
				tw="absolute bottom-0 left-0 w-px"
				style={{ height: windowSize.height * 2 }}
				ref={ref}
			/>
		</div>
	)
}

export default isomorphicComponent(InfiniteScrollCursor)
