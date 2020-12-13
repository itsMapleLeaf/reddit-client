import { decrement, increment, mod } from "helpers/number"
import { ReactNode, useState } from "react"
import tw from "twin.macro"
import Icon from "./Icon"
import { chevronLeftIcon, chevronRightIcon } from "./icons"

export default function Gallery<T>(props: {
	items: T[]
	renderItem: (item: T) => ReactNode
}) {
	const [index, setIndex] = useState(0)
	const currentItem = props.items[mod(index, props.items.length)]

	const buttonCss = tw`bg-gray-700 rounded-full shadow-md pointer-events-auto`

	return (
		<div tw="h-full relative">
			{currentItem != null ? props.renderItem(currentItem) : null}

			<div tw="absolute inset-0 flex flex-row items-center justify-between p-4 pointer-events-none">
				<button
					type="button"
					css={buttonCss}
					onClick={() => setIndex(decrement)}
				>
					<Icon name={chevronLeftIcon} tw="w-8" />
				</button>
				<button
					type="button"
					css={buttonCss}
					onClick={() => setIndex(increment)}
				>
					<Icon name={chevronRightIcon} tw="w-8" />
				</button>
			</div>
		</div>
	)
}
