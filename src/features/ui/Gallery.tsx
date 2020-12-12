import { decrement, increment, mod } from "helpers/number"
import { ReactNode, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "./icons"

export default function Gallery<T>(props: {
	items: T[]
	renderItem: (item: T) => ReactNode
}) {
	const [index, setIndex] = useState(0)
	const currentItem = props.items[mod(index, props.items.length)]

	const buttonClass =
		"rounded-full bg-gray-700 shadow-md p-1 pointer-events-auto"

	return (
		<div className="h-full relative">
			{currentItem != null ? props.renderItem(currentItem) : null}

			<div className="absolute inset-0 flex flex-row items-center justify-between p-4 pointer-events-none">
				<button
					type="button"
					className={buttonClass}
					onClick={() => setIndex(decrement)}
				>
					<ChevronLeftIcon className="w-6" />
				</button>
				<button
					type="button"
					className={buttonClass}
					onClick={() => setIndex(increment)}
				>
					<ChevronRightIcon className="w-6" />
				</button>
			</div>
		</div>
	)
}
