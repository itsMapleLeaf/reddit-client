import { tw } from "@twind/macro"
import { ReactNode, useState } from "react"
import { decrement, increment, mod } from "../helpers/number"
import Icon from "./Icon"
import { chevronLeftIcon, chevronRightIcon } from "./icons"

export default function Gallery<T>(props: {
	items: T[]
	renderItem: (item: T) => ReactNode
}) {
	const [index, setIndex] = useState(0)
	const currentItem = props.items[mod(index, props.items.length)]

	const buttonClass = tw`bg-gray-700 rounded-full shadow pointer-events-auto`

	return (
		<div tw="relative h-full">
			{currentItem != null ? props.renderItem(currentItem) : null}

			<div tw="absolute inset-0 flex flex-row items-center justify-between p-4 pointer-events-none">
				<button
					type="button"
					className={buttonClass}
					onClick={() => setIndex(decrement)}
				>
					<Icon name={chevronLeftIcon} tw="w-8" />
				</button>
				<button
					type="button"
					className={buttonClass}
					onClick={() => setIndex(increment)}
				>
					<Icon name={chevronRightIcon} tw="w-8" />
				</button>
			</div>
		</div>
	)
}
