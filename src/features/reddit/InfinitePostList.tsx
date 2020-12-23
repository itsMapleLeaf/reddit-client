import { useIntersectionObserver } from "features/dom/useIntersectionObserver"
import { useWindowSize } from "features/dom/useWindowSize"
import "twin.macro"
import PostCard from "./PostCard"
import { ListingResponse, Post } from "./types"

type Props = {
	data?: { pages: Array<ListingResponse<Post>> }
	error?: unknown
	isFetching?: boolean
	fetchNextPage?: () => void
}

export default function InfinitePostList({
	data,
	error,
	isFetching,
	fetchNextPage,
}: Props) {
	return (
		<>
			<div tw="space-y-4">
				{data != null && (
					<ul tw="space-y-4">
						{data.pages
							.flatMap((page) => page.data.children)
							.map((post) => (
								<li key={post.data.id}>
									<PostCard {...post} />
								</li>
							))}
					</ul>
				)}
				{error && (
					<p>{error instanceof Error ? error.message : String(error)}</p>
				)}
				{isFetching && <p>Loading...</p>}
			</div>
			<InfiniteScrollCursor onEndReached={fetchNextPage} />
		</>
	)
}

function InfiniteScrollCursor(props: { onEndReached?: () => void }) {
	const ref = useIntersectionObserver(([entry]) => {
		if (entry?.isIntersecting) props.onEndReached?.()
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
