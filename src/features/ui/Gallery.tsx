import { decrement, increment, mod } from "helpers/number"
import { ReactNode, useState } from "react"
import tw from "twin.macro"
import { ChevronLeftIcon, ChevronRightIcon } from "./icons"

export default function Gallery<T>(props: {
	items: T[]
	renderItem: (item: T) => ReactNode
}) {
	const [index, setIndex] = useState(0)
	const currentItem = props.items[mod(index, props.items.length)]

	const buttonClass = tw`p-1 bg-gray-700 rounded-full shadow-md pointer-events-auto`

	return (
		<div tw="h-full relative">
			{currentItem != null ? props.renderItem(currentItem) : null}

			<div tw="absolute inset-0 flex flex-row items-center justify-between p-4 pointer-events-none">
				<button
					type="button"
					css={buttonClass}
					onClick={() => setIndex(decrement)}
				>
					<ChevronLeftIcon tw="w-6" />
				</button>
				<button
					type="button"
					css={buttonClass}
					onClick={() => setIndex(increment)}
				>
					<ChevronRightIcon tw="w-6" />
				</button>
			</div>
		</div>
	)
}
