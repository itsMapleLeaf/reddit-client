import { ReactNode } from "react"

export default function AspectRatio(props: {
	ratio: number
	children: ReactNode
}) {
	return (
		<div
			className="relative"
			style={{ paddingBottom: `${(1 / props.ratio) * 100}%` }}
		>
			<div className="absolute inset-0">{props.children}</div>
		</div>
	)
}
