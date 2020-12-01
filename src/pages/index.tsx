import marked from "marked"
import React from "react"
import { SessionProvider, useSessionQuery } from "../app/client-session"
import { encodeUriParams } from "../app/common/url"
import { redditAppId, redditRedirectUri } from "../app/env"
import { useRedditInfiniteQuery } from "../app/reddit/fetch"
import { ListingResponse } from "../app/reddit/listing"

const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?${encodeUriParams(
	{
		client_id: redditAppId(),
		response_type: `code`,
		state: `.`,
		redirect_uri: redditRedirectUri(),
		duration: `permanent`,
		scope: "identity read",
	},
)}`

export default function Index() {
	const { data, isLoading } = useSessionQuery()

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (!data?.session) {
		return (
			<main className="container p-4 mx-auto">
				<a
					href={redditAuthUrl}
					className="inline-block p-3 font-medium leading-none tracking-wide text-white transition duration-200 rounded shadow-md bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
				>
					Login
				</a>
			</main>
		)
	}

	return (
		<SessionProvider session={data.session}>
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
						<p className="text-sm leading-none text-gray-400">Best</p>
					</div>
				</header>

				<main>
					<HotList />
				</main>
			</div>
		</SessionProvider>
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
