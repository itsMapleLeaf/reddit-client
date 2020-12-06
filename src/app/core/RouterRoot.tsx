import marked from "marked"
import { useRedditInfiniteQuery } from "../reddit/api"
import { ListingResponse } from "../reddit/types"

export default function RouterRoot() {
	return (
		<div className="space-y-4">
			<header
				className="sticky top-0 flex bg-gray-800 shadow-md bg-opacity-80"
				style={{ backdropFilter: `blur(4px)` }}
			>
				<button type="button" className="p-2" title="Menu">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>

				<div className="py-2 space-y-1">
					<h1 className="text-lg leading-none font-condensed">Home</h1>
					<p className="text-sm leading-none text-gray-400">Hot</p>
				</div>
			</header>

			<main>
				<HotList />
			</main>
		</div>
	)
}

function HotList() {
	const query = useRedditInfiniteQuery<ListingResponse>("/hot")

	return (
		<>
			{query.isLoading && <p>Loading...</p>}
			{query.error && <p>{String(query.error)}</p>}
			{query.data && (
				<ul className="space-y-4">
					{query.data.pages
						.flatMap((page) => page.data.children)
						.map((post) => (
							<li key={post.data.id}>
								<div className="p-3 space-y-4 bg-gray-800 shadow-md">
									<h1 className="text-2xl font-light font-condensed">
										{post.data.title}
									</h1>
									{post.data.selftext && (
										<div
											className="space-y-4"
											dangerouslySetInnerHTML={{
												__html: marked(post.data.selftext),
											}}
										/>
									)}
								</div>
							</li>
						))}
				</ul>
			)}
			<button onClick={() => query.fetchNextPage()}>load more</button>
		</>
	)
}
