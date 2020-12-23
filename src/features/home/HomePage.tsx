import { Menu } from "@headlessui/react"
import PostCard from "features/reddit/PostCard"
import Icon from "features/ui/Icon"
import { filterIcon, menuIcon } from "features/ui/icons"
import InfiniteScrollCursor from "features/ui/InfiniteScrollCursor"
import Link from "next/link"
import "twin.macro"
import tw from "twin.macro"
import { ListingResponse, Post } from "../reddit/types"

type Props = {
	subtitle: string
	data?: { pages: Array<ListingResponse<Post>> }
	error: unknown
	isFetching: boolean
	isFetched: boolean
	fetchNextPage: () => void
}

export default function HomePage(props: Props) {
	return (
		<div tw="space-y-4">
			<header
				tw="sticky top-0 grid items-center gap-3 p-3 bg-gray-800 shadow-md bg-opacity-80 z-10"
				style={{
					backdropFilter: `blur(4px)`,
					gridTemplateColumns: "auto 1fr auto",
				}}
			>
				<button type="button" title="Menu" tw="p-2 -m-2 block">
					<Icon name={menuIcon} tw="w-6" />
				</button>

				<div tw="grid gap-1">
					<h1 tw="text-lg leading-none font-condensed">Home</h1>
					<p tw="text-sm leading-none text-gray-400">{props.subtitle}</p>
				</div>

				<div tw="relative">
					<Menu>
						<Menu.Button title="Filter" tw="p-2 -m-2 block">
							<Icon name={filterIcon} tw="w-5" />
						</Menu.Button>

						<div tw="absolute right-0">
							<Menu.Items tw="relative top-2 grid w-max bg-gray-700 shadow-lg">
								<FilterLinks />
							</Menu.Items>
						</div>
					</Menu>
				</div>
			</header>

			<main tw="grid gap-4">
				{props.data != null && (
					<ul tw="grid gap-4">
						{props.data.pages
							.flatMap((page) => page.data.children)
							.map((post) => (
								<li key={post.data.id}>
									<PostCard {...post} />
								</li>
							))}
					</ul>
				)}
				{props.error && (
					<p>
						{props.error instanceof Error
							? props.error.message
							: String(props.error)}
					</p>
				)}
				{props.isFetching && <p>Loading...</p>}
			</main>

			{typeof window !== "undefined" && (
				<InfiniteScrollCursor
					onEndReached={() => {
						if (props.isFetched) props.fetchNextPage()
					}}
				/>
			)}
		</div>
	)
}

function FilterLinks() {
	const menuItems = [
		{ name: "Hot", href: "/home/hot" },
		{ name: "New", href: "/home/new" },
	]

	return menuItems.map((link, index) => (
		<Menu.Item key={index}>
			{({ active }) => {
				const linkCss = [
					tw`px-3 py-2 leading-none hover:bg-gray-600`,
					active && tw`bg-gray-600`,
				]

				return (
					<Link href={link.href} passHref>
						<a css={linkCss}>{link.name}</a>
					</Link>
				)
			}}
		</Menu.Item>
	)) as any
}
