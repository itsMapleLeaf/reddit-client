import { useSessionQuery } from "app/client-session"
import { mod } from "app/common/math"
import { useRedditListingQuery } from "app/reddit/api"
import RedditLoginButton from "app/reddit/RedditLoginButton"
import { Post } from "app/reddit/types"
import { formatDistanceToNow } from "date-fns"
import { useRouter } from "next/router"
import { ComponentChildren } from "preact"
import { useState } from "preact/hooks"
import { useMutation } from "react-query"

export default function Index() {
	const listing = useRedditListingQuery<Post>("/hot.json")

	return (
		<div class="space-y-4">
			<header
				class="sticky top-0 flex items-center px-2 space-x-2 bg-gray-800 shadow-md bg-opacity-80"
				style={{ backdropFilter: `blur(4px)` }}
			>
				<button type="button" class="p-2 -m-2" title="Menu">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
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
		<button type="button" class="button-solid" onClick={() => logout()}>
			Log out
		</button>
	)
}

function PostCard(props: Post) {
	return (
		<article class="bg-gray-800 shadow-md">
			<div class="p-3">
				<address class="text-xs text-gray-400 italic">
					<span class="text-gray-100 text-sm">/r/{props.data.subreddit}</span>
					<br />
					<span>posted by</span>{" "}
					<span class="text-gray-100">/u/{props.data.author}</span>{" "}
					<time>
						{formatDistanceToNow(new Date(props.data.created_utc * 1000), {
							includeSeconds: true,
						})}{" "}
						ago
					</time>
				</address>

				<h1 class="text-2xl font-light font-condensed mt-1">
					{props.data.title}
				</h1>
			</div>

			{props.data.post_hint === "image" && (
				<img src={props.data.url} role="presentation" />
			)}

			{props.data.is_gallery && (
				<Gallery<string>
					items={props.data.gallery_data.items.map(
						({ media_id }: { media_id: string }) => {
							return props.data.media_metadata[media_id].s.u.replaceAll(
								"&amp;",
								"&",
							)
						},
					)}
					renderItem={(url) => <img src={url} role="presentation" />}
				/>
			)}
		</article>
	)
}

function Gallery<T>(props: {
	items: T[]
	renderItem: (item: T) => ComponentChildren
}) {
	const [index, setIndex] = useState(0)
	const currentItem = props.items[mod(index, props.items.length)]

	const buttonClass = "rounded-full bg-gray-700 shadow-md p-1"

	return (
		<div class="flex items-center">
			{currentItem != null ? props.renderItem(currentItem) : null}

			<button
				type="button"
				class={`${buttonClass} absolute left-3`}
				onClick={() => setIndex((i) => i - 1)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<button
				type="button"
				class={`${buttonClass} absolute right-3`}
				onClick={() => setIndex((i) => i + 1)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>
		</div>
	)
}
