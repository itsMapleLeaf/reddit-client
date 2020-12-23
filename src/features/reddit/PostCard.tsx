import { formatDistanceToNowStrict } from "date-fns"
import AspectRatio from "features/ui/AspectRatio"
import Gallery from "features/ui/Gallery"
import { unescape } from "html-escaper"
import "twin.macro"
import { Post } from "./types"

export default function PostCard({ data }: Pick<Post, "data">) {
	const createdDate = new Date(data.created_utc * 1000)
	const timeAgo = formatDistanceToNowStrict(createdDate, { addSuffix: true })

	return (
		<article tw="bg-gray-800 shadow-md">
			<div tw="p-3 space-y-1">
				<div tw="leading-snug italic text-xs text-gray-400">
					<span tw="text-sm leading-none ">
						/r/<span tw="text-gray-100">{data.subreddit}</span>
					</span>
					<span> • </span>
					<span tw="inline-block">posted by /u/{data.author}</span>{" "}
					<time tw="inline-block" dateTime={createdDate.toISOString()}>
						{timeAgo}
					</time>
				</div>

				<h1 tw="text-2xl font-light font-condensed">{data.title}</h1>
			</div>

			<div tw="bg-black bg-opacity-25">
				{data.post_hint === "image" && (
					<img
						src={data.url}
						role="presentation"
						tw="w-full object-contain"
						style={{ maxHeight: "24rem" }}
					/>
				)}

				{data.gallery_data && (
					<AspectRatio ratio={1 / 1}>
						<PostGallery data={data} />
					</AspectRatio>
				)}

				{data.secure_media?.reddit_video && (
					<video
						controls
						tw="w-full object-contain"
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

function PostGallery({ data }: Pick<Post, "data">) {
	const getGalleryItemUrl = ({ media_id }: { media_id: string }) =>
		unescape(data.media_metadata[media_id].s.u)

	return (
		<Gallery<string>
			items={data.gallery_data.items.map(getGalleryItemUrl)}
			renderItem={(url) => (
				<img src={url} role="presentation" tw="w-full h-full object-contain" />
			)}
		/>
	)
}
