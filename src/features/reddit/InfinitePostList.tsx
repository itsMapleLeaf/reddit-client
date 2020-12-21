import { useIntersectionObserver } from "features/dom/useIntersectionObserver"
import { useWindowSize } from "features/dom/useWindowSize"
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
		<>
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
				{query.isFetching && <p>Loading...</p>}
			</div>
			<InfiniteScrollCursor onEndReached={query.fetchNextPage} />
		</>
	)
}

function InfiniteScrollCursor(props: { onEndReached: () => void }) {
	const ref = useIntersectionObserver(([entry]) => {
		if (entry?.isIntersecting) props.onEndReached()
	})

	const windowSize = useWindowSize()

	return (
		<div tw="relative">
			<div
				tw="absolute bottom-0 left-0 w-px"
				style={{ height: windowSize.height * 2 }}
				ref={ref}
			/>
		</div>
	)
}
