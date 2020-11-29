import { useRedditInfiniteQuery } from "../reddit/fetch"
import { ListingResponse } from "../reddit/listing"

export function Home() {
	const {
		data,
		error,
		isLoading,
		fetchNextPage,
	} = useRedditInfiniteQuery<ListingResponse>("/hot")

	return (
		<main>
			{isLoading && <p>Loading...</p>}
			{error && <p>{String(error)}</p>}
			{data && (
				<ul>
					{data.pages
						.flatMap((page) => page.data.children)
						.map((post) => (
							<h1 key={post.data.id}>{post.data.title}</h1>
						))}
				</ul>
			)}
			<button onClick={() => fetchNextPage()}>load more</button>
		</main>
	)
}
