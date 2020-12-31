import { decrement, increment, mod } from "helpers/number"
import { ReactNode, useState } from "react"
import { tw } from "twind"
import Icon from "./Icon"
import { chevronLeftIcon, chevronRightIcon } from "./icons"

export default function Gallery<T>(props: {
	items: T[]
	renderItem: (item: T) => ReactNode
}) {
	const [index, setIndex] = useState(0)
	const currentItem = props.items[mod(index, props.items.length)]

	const buttonCss = tw`bg-gray-700 rounded-full shadow pointer-events-auto`

	return (
		<div className={tw`relative h-full`}>
			{currentItem != null ? props.renderItem(currentItem) : null}

			<div
				className={tw`absolute inset-0 flex flex-row items-center justify-between p-4 pointer-events-none`}
			>
				<button
					type="button"
					className={buttonCss}
					onClick={() => setIndex(decrement)}
				>
					<Icon name={chevronLeftIcon} className={tw`w-8`} />
				</button>
				<button
					type="button"
					className={buttonCss}
					onClick={() => setIndex(increment)}
				>
					<Icon name={chevronRightIcon} className={tw`w-8`} />
				</button>
			</div>
		</div>
	)
}
