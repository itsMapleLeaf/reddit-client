import PostList from "features/post/PostList"
import type { RedditSort } from "features/reddit/RedditSortMenu"
import RedditSortMenu from "features/reddit/RedditSortMenu"
import Icon from "features/ui/Icon"
import { menuIcon } from "features/ui/icons"
import { useRouter } from "next/router"
import type { ReactNode } from "react"
import "twind.macro"

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
				right={<RedditSortMenu sortMap={redditSortMap} />}
			/>
			<PostList endpoint={redditSort.endpoint} />
		</div>
	)
}

function Header(props: { title: string; subtitle: string; right: ReactNode }) {
	return (
		<header
			tw="sticky top-0 z-10 grid items-center gap-3 p-3 bg-gray-800 shadow bg-opacity-80"
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
