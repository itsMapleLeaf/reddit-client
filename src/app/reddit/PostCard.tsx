import AspectRatio from "app/ui/AspectRatio"
import Gallery from "app/ui/Gallery"
import { formatDistanceToNowStrict } from "date-fns"
import { Post } from "./types"

export default function PostCard({ data }: Post) {
	const createdDate = new Date(data.created_utc * 1000)
	const timeAgo = formatDistanceToNowStrict(createdDate, { addSuffix: true })

	return (
		<article class="bg-gray-800 shadow-md">
			<div class="p-3 space-y-1">
				<div class="leading-snug italic text-xs text-gray-400">
					<span class="text-sm leading-none ">
						/r/<span className="text-gray-100">{data.subreddit}</span>
					</span>
					<span> • </span>
					<span class="inline-block">posted by /u/{data.author}</span>{" "}
					<time class="inline-block" dateTime={createdDate.toISOString()}>
						{timeAgo}
					</time>
				</div>

				<h1 class="text-2xl font-light font-condensed">{data.title}</h1>
			</div>

			<div class="bg-black bg-opacity-25">
				{data.post_hint === "image" && (
					<img
						src={data.url}
						role="presentation"
						class="w-full object-contain"
						style={{ maxHeight: "24rem" }}
					/>
				)}

				{data.gallery_data && (
					<AspectRatio ratio={1 / 1}>
						<Gallery<string>
							items={data.gallery_data.items.map(
								({ media_id }: { media_id: string }) =>
									data.media_metadata[media_id].s.u.replaceAll("&amp;", "&"),
							)}
							renderItem={(url) => (
								<img
									src={url}
									role="presentation"
									class="w-full h-full object-contain"
								/>
							)}
						/>
					</AspectRatio>
				)}

				{data.secure_media?.reddit_video && (
					<video
						controls
						class="w-full object-contain"
						style={{ maxHeight: "24rem" }}
					>
						<source src={data.secure_media.reddit_video.hls_url} />
						<source src={data.secure_media.reddit_video.fallback_url} />
					</video>
				)}
			</div>
		</article>
	)
}
