import Gallery from "app/ui/Gallery"
import { formatDistanceToNow } from "date-fns"
import { Post } from "./types"

export default function PostCard(props: Post) {
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
