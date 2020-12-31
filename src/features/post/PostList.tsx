import PostCard from "features/post/PostCard"
import type { PostData } from "features/post/types"
import { useRedditListingQuery } from "features/reddit/queries"
import InfiniteScrollCursor from "features/ui/InfiniteScrollCursor"
import { tw } from "twind"

export default function PostList({ endpoint }: { endpoint: string }) {
	const query = useRedditListingQuery<PostData>({ endpoint })

	return (
		<main className={tw`grid gap-4 mx-auto`}>
			{query.data != null && (
				<ul className={tw`grid gap-4`}>
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
