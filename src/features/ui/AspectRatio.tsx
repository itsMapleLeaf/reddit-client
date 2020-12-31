import type { ReactNode } from "react"
import { tw } from "twind"

export default function AspectRatio(props: {
	ratio: number
	children: ReactNode
}) {
	return (
		<div
			className={tw`relative`}
			style={{ paddingBottom: `${(1 / props.ratio) * 100}%` }}
		>
			<div className={tw`absolute inset-0`}>{props.children}</div>
		</div>
	)
}
