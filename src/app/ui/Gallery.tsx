import { decrement, increment, mod } from "app/common/number"
import { ComponentChildren } from "preact"
import { useState } from "preact/hooks"
import { ChevronLeftIcon, ChevronRightIcon } from "./icons"

export default function Gallery<T>(props: {
	items: T[]
	renderItem: (item: T) => ComponentChildren
}) {
	const [index, setIndex] = useState(0)
	const currentItem = props.items[mod(index, props.items.length)]

	const buttonClass =
		"rounded-full bg-gray-700 shadow-md p-1 pointer-events-auto"

	return (
		<div class="h-full relative">
			{currentItem != null ? props.renderItem(currentItem) : null}

			<div className="absolute inset-0 flex flex-row items-center justify-between p-4 pointer-events-none">
				<button
					type="button"
					class={buttonClass}
					onClick={() => setIndex(decrement)}
				>
					<ChevronLeftIcon class="w-6" />
				</button>
				<button
					type="button"
					class={buttonClass}
					onClick={() => setIndex(increment)}
				>
					<ChevronRightIcon class="w-6" />
				</button>
			</div>
		</div>
	)
}
