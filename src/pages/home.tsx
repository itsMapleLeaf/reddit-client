import { Menu } from "@headlessui/react"
import PostCard from "features/reddit/PostCard"
import { useRedditListingQuery } from "features/reddit/queries"
import { Post } from "features/reddit/types"
import Icon from "features/ui/Icon"
import { filterIcon, menuIcon } from "features/ui/icons"
import InfiniteScrollCursor from "features/ui/InfiniteScrollCursor"
import { useRouter } from "next/router"
import "twin.macro"
import tw from "twin.macro"

const defaultFilter = { title: "Hot", endpoint: "/hot.json" }

const filters: Record<string, { title: string; endpoint: string }> = {
	hot: defaultFilter,
	best: { title: "Best", endpoint: "/best.json" },
	new: { title: "New", endpoint: "/new.json" },
	top: { title: "Top", endpoint: "/top.json" },
}

export default function Home() {
	const router = useRouter()
	const filter = filters[String(router.query.filter)] ?? defaultFilter

	const setFilter = (filterKey: string) => {
		router.replace(`${router.pathname}?filter=${filterKey}`)
	}

	const query = useRedditListingQuery<Post>({
		endpoint: filter.endpoint,
	})

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
					<p tw="text-sm leading-none text-gray-400">{filter.title}</p>
				</div>

				<div tw="relative">
					<Menu>
						<Menu.Button title="Filter" tw="p-2 -m-2 block">
							<Icon name={filterIcon} tw="w-5" />
						</Menu.Button>

						<div tw="absolute right-0">
							<Menu.Items tw="relative top-2 grid w-max bg-gray-700 shadow-lg">
								{Object.entries(filters).map(([key, filter]) => (
									<FilterLink
										key={key}
										text={filter.title}
										onClick={() => setFilter(key)}
									/>
								))}
							</Menu.Items>
						</div>
					</Menu>
				</div>
			</header>

			<main tw="grid gap-4">
				{query.data != null && (
					<ul tw="grid gap-4">
						{query.data.pages
							.flatMap((page) => page.data.children)
							.map((post) => (
								<li key={post.data.id}>
									<PostCard {...post} />
								</li>
							))}
					</ul>
				)}
				{query.error && (
					<p>
						{query.error instanceof Error
							? query.error.message
							: String(query.error)}
					</p>
				)}
				{query.isFetching && <p>Loading...</p>}
			</main>

			{typeof window !== "undefined" && (
				<InfiniteScrollCursor
					onEndReached={() => {
						if (query.isFetched) query.fetchNextPage()
					}}
				/>
			)}
		</div>
	)
}

function FilterLink(props: { text: string; onClick: () => void }): JSX.Element {
	return (
		<Menu.Item>
			{({ active }) => (
				<button
					type="button"
					onClick={props.onClick}
					css={getFilterLinkCss(active)}
				>
					{props.text}
				</button>
			)}
		</Menu.Item>
	)
}

function getFilterLinkCss(active: boolean) {
	return [
		tw`px-3 py-2 leading-none hover:bg-gray-600`,
		active && tw`bg-gray-600`,
	]
}
