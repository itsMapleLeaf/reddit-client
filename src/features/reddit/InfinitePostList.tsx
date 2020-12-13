import { UseInfiniteQueryResult } from "react-query"
import "twin.macro"
import PostCard from "./PostCard"
import { ListingResponse, Post } from "./types"

export default function InfinitePostList({
	query,
}: {
	query: UseInfiniteQueryResult<ListingResponse<Post>>
}) {
	return (
		<div tw="space-y-4">
			{query.data != null && (
				<ul tw="space-y-4">
					{query.data.pages
						.flatMap((page) => page.data.children)
						.map((post) => (
							<li key={post.data.id}>
								<PostCard {...post} />
							</li>
						))}
				</ul>
			)}
			{query.isError && <p>{String(query.error)}</p>}
			{query.isLoading && <p>Loading...</p>}
			{query.hasNextPage && !query.isLoading && (
				<button onClick={() => query.fetchNextPage()}>load more</button>
			)}
		</div>
	)
}
