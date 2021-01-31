import "@twind/macro"
import { ReactNode, useRef } from "react"
import { useEvent } from "react-use"
import useResizeObserver from "use-resize-observer"

export function StickyContainer({ children }: { children: ReactNode }) {
	const innerRef = useRef<HTMLDivElement>(null)
	const { ref: outerRef, width } = useResizeObserver()
	const scroll = useRef(typeof window !== "undefined" ? window.scrollY : 0)
	const offset = useRef(0)

	useEvent("scroll", () => {
		const delta = window.scrollY - scroll.current
		scroll.current = window.scrollY

		const { offsetTop, clientHeight, style } = innerRef.current!

		// if the inner element doesn't extend beyond the sliding area,
		// just keep it at the top
		if (clientHeight < window.innerHeight - offsetTop) {
			offset.current = 0
		} else {
			// if scrolling down, make sure the element stays sticky at the bottom
			if (delta > 0) {
				offset.current = Math.max(
					offset.current - delta,
					window.innerHeight - clientHeight - offsetTop,
				)
			}

			// if scrolling up, make sure the element stays sticky at the top
			if (delta < 0) {
				offset.current = Math.min(offset.current - delta, 0)
			}
		}

		style.transform = `translateY(${offset.current}px)`
	})

	return (
		<div tw="w-full" ref={outerRef}>
			<div ref={innerRef} style={{ position: "fixed", width }}>
				{children}
			</div>
		</div>
	)
}
