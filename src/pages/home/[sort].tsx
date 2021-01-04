import MainNavigation from "features/app/MainNavigation"
import AuthButton from "features/auth/AuthButton"
import PostList from "features/post/PostList"
import RedditSortMenu, { RedditSort } from "features/reddit/RedditSortMenu"
import DrawerDialog from "features/ui/DrawerDialog"
import Icon from "features/ui/Icon"
import { menuIcon } from "features/ui/icons"
import StickyContainer from "features/ui/StickyContainer"
import { useRouter } from "next/router"
import "twind.macro"

const defaultRedditSort: RedditSort = {
	label: "Hot",
	endpoint: "/hot.json",
	route: "/home/hot",
}

const redditSortMap: Record<string, RedditSort> = {
	hot: defaultRedditSort,
	best: { label: "Best", endpoint: "/best.json", route: "/home/best" },
	new: { label: "New", endpoint: "/new.json", route: "/home/new" },
	top: { label: "Top", endpoint: "/top.json", route: "/home/top" },
}

export default function Home() {
	const router = useRouter()

	const redditSort =
		redditSortMap[String(router.query.sort)] ?? defaultRedditSort

	return (
		<div tw="space-y-4">
			<Header subtitle={redditSort.label} />
			<div tw="flex items-start max-w-screen-lg mx-auto md:px-4">
				<div tw="hidden w-64 mr-4 lg:block">
					<StickyContainer>
						<div tw="p-3 mb-4 bg-gray-800 rounded-md shadow">
							<MainNavigation />
						</div>
					</StickyContainer>
				</div>
				<div tw="flex-1">
					<PostList endpoint={redditSort.endpoint} />
				</div>
			</div>
		</div>
	)
}

function Header(props: { subtitle: string }) {
	return (
		<header
			tw="sticky top-0 z-10 bg-gray-800 shadow bg-opacity-80"
			style={{ backdropFilter: `blur(4px)` }}
		>
			<div tw="flex items-center max-w-screen-lg p-4 mx-auto">
				<div tw="block mr-4 lg:hidden">
					<DrawerDialog
						label="Main Navigation"
						trigger={
							<button title="Menu" tw="block p-2 -m-2 ">
								<Icon name={menuIcon} tw="w-6" />
							</button>
						}
					>
						<MainNavigation />
					</DrawerDialog>
				</div>

				<div tw="flex-1 space-y-1">
					<h1 tw="text-lg leading-none font-condensed">Home</h1>
					<p tw="text-sm leading-none text-gray-400">{props.subtitle}</p>
				</div>

				<AuthButton />

				<div tw="w-4" />

				<RedditSortMenu sortMap={redditSortMap} />
			</div>
		</header>
	)
}
