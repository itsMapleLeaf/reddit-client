import { useWindowSize } from "features/dom/hooks"
import { useEffectRef } from "helpers/react"
import { useEffect, useRef } from "react"
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
	const cursor = useRef<HTMLDivElement>(null)
	const onEndReachedRef = useEffectRef(props.onEndReached)
	const windowSize = useWindowSize()

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry!.isIntersecting) {
				onEndReachedRef.current()
			}
		})
		observer.observe(cursor.current!)
		return () => observer.disconnect()
	}, [onEndReachedRef])

	return (
		<div tw="relative">
			<div
				tw="absolute bottom-0 left-0 w-px"
				style={{ height: windowSize.height * 2 }}
				ref={cursor}
			/>
		</div>
	)
}
