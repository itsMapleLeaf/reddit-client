import { formatDistanceToNowStrict } from "date-fns"
import AspectRatio from "features/ui/AspectRatio"
import Gallery from "features/ui/Gallery"
import Icon from "features/ui/Icon"
import { downArrowIcon, upArrowIcon } from "features/ui/icons"
import { isTruthy } from "helpers/boolean"
import { unescape } from "html-escaper"
import Link from "next/link"
import "twin.macro"
import { Post } from "./types"

export default function PostCard({ data }: Pick<Post, "data">) {
	const createdDate = new Date(data.created_utc * 1000)
	const timeAgo = formatDistanceToNowStrict(createdDate, { addSuffix: true })

	return (
		<article tw="bg-gray-800 shadow-lg md:rounded-md overflow-hidden">
			<div tw="p-3 space-y-1">
				<div tw="leading-snug text-xs text-gray-400">
					<Link href={`/r/${data.subreddit}`} passHref>
						<a tw="text-sm leading-none hover:underline">
							/r/<span tw="text-gray-100">{data.subreddit}</span>
						</a>
					</Link>
					{" • "}
					<Link href={`/u/${data.author}`} passHref>
						<a tw="inline-block hover:underline">posted by /u/{data.author}</a>
					</Link>{" "}
					<time tw="inline-block" dateTime={createdDate.toISOString()}>
						<Link href={`/p/${data.id}`} passHref>
							<a tw="hover:underline">{timeAgo}</a>
						</Link>
					</time>
				</div>

				<h1 tw="text-2xl font-light font-condensed">{data.title}</h1>
			</div>

			<div tw="bg-black bg-opacity-40">
				{data.post_hint === "image" && (
					<img
						src={data.url}
						role="presentation"
						tw="w-full object-contain"
						style={{ maxHeight: "75vh" }}
					/>
				)}

				{data.gallery_data && (
					<AspectRatio ratio={1 / 1}>
						<Gallery<string>
							items={getPostGalleryUrls(data)}
							renderItem={(url) => (
								<img
									src={url}
									role="presentation"
									tw="w-full h-full object-contain"
								/>
							)}
						/>
					</AspectRatio>
				)}

				{data.secure_media?.reddit_video && (
					<video
						controls
						tw="w-full object-contain"
						style={{ maxHeight: "calc(100vh - 8rem)" }}
					>
						<source src={data.secure_media.reddit_video.hls_url} />
						<source src={data.secure_media.reddit_video.fallback_url} />
					</video>
				)}
			</div>

			<div tw="grid p-2 gap-2 grid-flow-col auto-cols-min bg-black bg-opacity-25">
				<button type="button">
					<Icon name={upArrowIcon} />
				</button>
				{data.ups}
				<button type="button">
					<Icon name={downArrowIcon} />
				</button>
			</div>
		</article>
	)
}

function getPostGalleryUrls(data: Post["data"]): string[] {
	const items: { media_id: string }[] = data.gallery_data.items
	return items
		.map(
			({ media_id }): string | undefined => data.media_metadata[media_id].s.u,
		)
		.filter(isTruthy)
		.map(unescape)
}
