import { Menu } from "@headlessui/react"
import Icon from "features/ui/Icon"
import { filterIcon } from "features/ui/icons"
import Link from "next/link"
import tw from "twin.macro"

export type RedditSort = {
	label: string
	endpoint: string
	route: string
}

function getSortLinkCss(active: boolean) {
	return [
		tw`px-3 py-2 leading-none hover:bg-gray-600`,
		active && tw`bg-gray-600`,
	]
}

export default function RedditSortMenu(props: {
	sortMap: Record<string, RedditSort>
}) {
	return (
		<div tw="relative">
			<Menu>
				<Menu.Button title="Sort by..." tw="block p-2 -m-2">
					<Icon name={filterIcon} tw="w-5" />
				</Menu.Button>

				<div tw="absolute right-0">
					<Menu.Items tw="relative grid bg-gray-700 shadow-lg top-2 w-max">
						{Object.entries(props.sortMap).map(([key, sort]) => (
							<Menu.Item key={key}>
								{({ active }) => (
									<Link href={sort.route} passHref>
										<a css={getSortLinkCss(active)}>{sort.label}</a>
									</Link>
								)}
							</Menu.Item>
						))}
					</Menu.Items>
				</div>
			</Menu>
		</div>
	)
}
