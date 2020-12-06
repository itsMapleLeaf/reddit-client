import { ComponentChildren } from "preact"

export default function AspectRatio(props: {
	ratio: number
	children: ComponentChildren
}) {
	return (
		<div
			class="relative"
			style={{ paddingBottom: `${(1 / props.ratio) * 100}%` }}
		>
			<div className="absolute inset-0">{props.children}</div>
		</div>
	)
}
