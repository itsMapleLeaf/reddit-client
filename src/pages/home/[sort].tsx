import AuthButton from "features/auth/AuthButton"
import PostCard from "features/reddit/PostCard"
import { useRedditListingQuery } from "features/reddit/queries"
import RedditSortMenu, { RedditSort } from "features/reddit/RedditSortMenu"
import type { Post } from "features/reddit/types"
import DrawerDialog from "features/ui/DrawerDialog"
import Icon from "features/ui/Icon"
import { menuIcon } from "features/ui/icons"
import InfiniteScrollCursor from "features/ui/InfiniteScrollCursor"
import { useRouter } from "next/router"
import "twin.macro"

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
			<div tw="flex max-w-screen-lg mx-auto md:px-4">
				<div tw="hidden w-64 mr-4 lg:block">
					<MainNavigation />
				</div>
				<PostList endpoint={redditSort.endpoint} />
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

function PostList({ endpoint }: { endpoint: string }) {
	const query = useRedditListingQuery<Post>({ endpoint })

	return (
		<main tw="grid gap-4 mx-auto">
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

function MainNavigation() {
	return (
		<div>
			<p>
				aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
			</p>
			<p>
				Incididunt minim adipisicing cupidatat sint id. Ut laboris amet mollit
				elit pariatur dolor quis magna est velit eiusmod irure voluptate nulla.
				Nulla culpa ad pariatur in. Voluptate ut esse culpa nisi cillum sint
				cillum in nostrud aliquip nostrud. Amet non officia mollit proident.
				Dolor sunt consequat labore amet cillum cupidatat ullamco aute laboris
				aute labore tempor. Enim eu dolor aliqua cupidatat sit consequat non
				ipsum pariatur tempor tempor aliquip incididunt.
			</p>
			<p>
				Ea in occaecat dolor esse deserunt incididunt excepteur ea eu. Esse
				tempor occaecat aute id elit nostrud. In ex excepteur irure voluptate
				pariatur commodo excepteur. Adipisicing tempor ipsum fugiat laboris
				nostrud dolore eiusmod eu culpa eu proident in veniam. Et ipsum proident
				Lorem ipsum aute sit in irure ut reprehenderit. Nulla non commodo do
				sint anim laborum magna. Qui id ut labore aliquip veniam cupidatat dolor
				irure deserunt esse in eiusmod aliqua tempor.
			</p>
			<p>
				Magna voluptate nulla sit do labore ut cillum mollit labore esse. Do
				mollit magna anim officia non. Nulla ad pariatur enim mollit veniam
				dolor tempor duis sint elit ad eu nulla est. Sunt aliqua cupidatat minim
				nulla ullamco exercitation elit duis cupidatat quis irure. Aute amet
				elit quis nostrud deserunt aute qui commodo laboris amet dolore.
			</p>
		</div>
	)
}
