import { Menu } from "@headlessui/react"
import PostCard from "features/reddit/PostCard"
import { useRedditListingQuery } from "features/reddit/queries"
import type { Post } from "features/reddit/types"
import Icon from "features/ui/Icon"
import { filterIcon, menuIcon } from "features/ui/icons"
import InfiniteScrollCursor from "features/ui/InfiniteScrollCursor"
import Link from "next/link"
import { useRouter } from "next/router"
import type { ReactNode } from "react"
import "twin.macro"
import tw from "twin.macro"

type RedditSort = {
	label: string
	endpoint: string
	route: string
}

export default function Subreddit() {
	const router = useRouter()
	const subreddit = String(router.query.subreddit || "")

	const defaultRedditSort: RedditSort = {
		label: "Hot",
		endpoint: `/r/${subreddit}/hot.json`,
		route: `/r/${subreddit}/hot`,
	}

	const redditSortMap: Record<string, RedditSort> = {
		hot: defaultRedditSort,
		best: {
			label: "Best",
			endpoint: `/r/${subreddit}/best.json`,
			route: `/r/${subreddit}/best`,
		},
		new: {
			label: "New",
			endpoint: `/r/${subreddit}/new.json`,
			route: `/r/${subreddit}/new`,
		},
		top: {
			label: "Top",
			endpoint: `/r/${subreddit}/top.json`,
			route: `/r/${subreddit}/top`,
		},
	}

	const redditSort =
		redditSortMap[String(router.query.sort)] ?? defaultRedditSort

	return (
		<div tw="space-y-4">
			<Header
				title={`/r/${subreddit}`}
				subtitle={redditSort.label}
				right={<SortMenu sortMap={redditSortMap} />}
			/>
			<PostList endpoint={redditSort.endpoint} />
		</div>
	)
}

function Header(props: { title: string; subtitle: string; right: ReactNode }) {
	return (
		<header
			tw="sticky top-0 z-10 grid items-center gap-3 p-3 bg-gray-800 shadow-md bg-opacity-80"
			style={{
				backdropFilter: `blur(4px)`,
				gridTemplateColumns: "auto 1fr auto",
			}}
		>
			<button type="button" title="Menu" tw="block p-2 -m-2">
				<Icon name={menuIcon} tw="w-6" />
			</button>
			<div tw="grid gap-1">
				<h1 tw="text-lg leading-none font-condensed">{props.title}</h1>
				<p tw="text-sm leading-none text-gray-400">{props.subtitle}</p>
			</div>
			{props.right}
		</header>
	)
}

function PostList({ endpoint }: { endpoint: string }) {
	const query = useRedditListingQuery<Post>({ endpoint })

	return (
		<main tw="grid max-w-screen-md gap-4 mx-auto">
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

			{typeof window !== "undefined" && (
				<InfiniteScrollCursor
					onEndReached={() => {
						if (query.isFetched) query.fetchNextPage()
					}}
				/>
			)}
		</main>
	)
}

function SortMenu(props: { sortMap: Record<string, RedditSort> }) {
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

function getSortLinkCss(active: boolean) {
	return [
		tw`px-3 py-2 leading-none hover:bg-gray-600`,
		active && tw`bg-gray-600`,
	]
}
