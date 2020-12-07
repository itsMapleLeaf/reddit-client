import AuthButton from "app/auth/AuthButton"
import { useRedditListingQuery } from "app/reddit/api"
import PostCard from "app/reddit/PostCard"
import { Post } from "app/reddit/types"
import { MenuIcon } from "app/ui/icons"

export default function Index() {
	const listing = useRedditListingQuery<Post>("/hot.json")

	return (
		<div class="pt-20 relative">
			<header
				class="fixed inset-x-0 h-16 top-0 flex items-center px-2 space-x-2 bg-gray-800 shadow-md bg-opacity-80 z-10"
				style={{ backdropFilter: `blur(4px)` }}
			>
				<button type="button" class="p-2 -m-2" title="Menu">
					<MenuIcon class="w-6" />
				</button>

				<div class="flex-1 py-2 space-y-1">
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
