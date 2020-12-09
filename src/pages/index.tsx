import AuthButton from "features/auth/AuthButton"
import PostCard from "features/reddit/PostCard"
import { useRedditListingQuery } from "features/reddit/queries"
import { Post } from "features/reddit/types"
import { MenuIcon } from "features/ui/icons"

export default function Index() {
	const listing = useRedditListingQuery<Post>("/hot.json")

	return (
		<div class="space-y-2">
			<header
				class="sticky top-0 flex items-center p-3 space-x-3 bg-gray-800 shadow-md bg-opacity-80 z-10"
				style={{ backdropFilter: `blur(4px)` }}
			>
				<button type="button" class="p-2 -m-2" title="Menu">
					<MenuIcon class="w-6" />
				</button>

				<div class="flex-1 space-y-1">
					<h1 class="text-lg leading-none font-condensed">Home</h1>
					<p class="text-sm leading-none text-gray-400">Hot</p>
				</div>

				<AuthButton />
			</header>

			<main>
				{listing.isLoading && <p>Loading...</p>}
				{listing.error && <p>{String(listing.error)}</p>}
				{listing.data && (
					<ul class="space-y-4">
						{listing.data.pages
							.flatMap((page) => page.data.children)
							.map((post) => (
								<li key={post.data.id}>
									<PostCard {...post} />
								</li>
							))}
						<button onClick={() => listing.fetchNextPage()}>load more</button>
					</ul>
				)}
			</main>
		</div>
	)
}
