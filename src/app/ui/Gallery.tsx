import { mod } from "app/common/math"
import { ComponentChildren } from "preact"
import { useState } from "preact/hooks"

export default function Gallery<T>(props: {
	items: T[]
	renderItem: (item: T) => ComponentChildren
}) {
	const [index, setIndex] = useState(0)
	const currentItem = props.items[mod(index, props.items.length)]

	const buttonClass = "rounded-full bg-gray-700 shadow-md p-1"

	return (
		<div class="flex items-center">
			{currentItem != null ? props.renderItem(currentItem) : null}

			<button
				type="button"
				class={`${buttonClass} absolute left-3`}
				onClick={() => setIndex((i) => i - 1)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<button
				type="button"
				class={`${buttonClass} absolute right-3`}
				onClick={() => setIndex((i) => i + 1)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>
		</div>
	)
}
