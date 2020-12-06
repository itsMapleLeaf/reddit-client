import marked from "marked"
import { useRouter } from "next/router"
import React from "react"
import { useMutation } from "react-query"
import { useSessionQuery } from "../app/client-session"
import { useRedditInfiniteQuery } from "../app/reddit/api"
import RedditLoginButton from "../app/reddit/RedditLoginButton"
import { ListingResponse } from "../app/reddit/types"

export default function Index() {
	const listing = useRedditInfiniteQuery<ListingResponse>("/hot.json")

	return (
		<div className="space-y-4">
			<header
				className="sticky top-0 flex items-center px-2 space-x-2 bg-gray-800 shadow-md bg-opacity-80"
				style={{ backdropFilter: `blur(4px)` }}
			>
				<button type="button" className="p-2 -m-2" title="Menu">
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

				<div className="flex-1 py-2 space-y-1">
					<h1 className="text-lg leading-none font-condensed">Home</h1>
					<p className="text-sm leading-none text-gray-400">Hot</p>
				</div>

				<AuthButton />
			</header>

			<main>
				{listing.isLoading && <p>Loading...</p>}
				{listing.error && <p>{String(listing.error)}</p>}
				{listing.data && (
					<ul className="space-y-4">
						{listing.data.pages
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
						<button onClick={() => listing.fetchNextPage()}>load more</button>
					</ul>
				)}
			</main>
		</div>
	)
}

function AuthButton() {
	const session = useSessionQuery()
	const router = useRouter()

	const { mutate: logout } = useMutation(
		async () => {
			const res = await fetch(`/api/logout`, { credentials: "include" })
			return res.json()
		},
		{
			onSuccess: () => router.reload(),
		},
	)

	if (session.isLoading) {
		return null
	}

	if (!session.data?.session) {
		return <RedditLoginButton />
	}

	return (
		<button type="button" className="button-solid" onClick={() => logout()}>
			Log out
		</button>
	)
}
