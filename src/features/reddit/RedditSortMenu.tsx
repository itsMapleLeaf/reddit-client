import { tw } from "@twind/macro"
import Icon from "features/ui/Icon"
import { filterIcon } from "features/ui/icons"
import Link from "next/link"
import { Menu, MenuButton, MenuItem, useMenuState } from "reakit"

export type RedditSort = {
	label: string
	endpoint: string
	route: string
}

function getSortLinkCss(active: boolean) {
	return tw(
		tw`px-3 py-2 leading-none hover:bg-gray-600`,
		active && tw`bg-gray-600`,
	)
}

export default function RedditSortMenu(props: {
	sortMap: Record<string, RedditSort>
}) {
	const menu = useMenuState({
		placement: "bottom-end",
		gutter: 8,
	})

	return (
		<>
			<MenuButton {...menu} title="Sort by..." tw="block p-2 -m-2">
				<Icon name={filterIcon} tw="w-5" />
			</MenuButton>
			<Menu {...menu} tw="grid bg-gray-700 shadow w-max">
				{Object.entries(props.sortMap).map(([key, sort]) => (
					<Link key={key} href={sort.route} passHref>
						<MenuItem
							{...menu}
							as="a"
							id={key}
							className={getSortLinkCss(menu.currentId === key)}
							onClick={() => menu.hide()}
						>
							{sort.label}
						</MenuItem>
					</Link>
				))}
			</Menu>
		</>
	)
}
