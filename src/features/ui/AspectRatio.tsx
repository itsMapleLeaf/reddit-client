import "@twind/macro"
import type { ReactNode } from "react"

export default function AspectRatio(props: {
	ratio: number
	children: ReactNode
}) {
	return (
		<div tw="relative" style={{ paddingBottom: `${(1 / props.ratio) * 100}%` }}>
			<div tw="absolute inset-0">{props.children}</div>
		</div>
	)
}
