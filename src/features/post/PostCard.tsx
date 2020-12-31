import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import AspectRatio from "features/ui/AspectRatio"
import Gallery from "features/ui/Gallery"
import Icon from "features/ui/Icon"
import { downArrowIcon, upArrowIcon } from "features/ui/icons"
import { isTruthy } from "helpers/boolean"
import { unescape } from "html-escaper"
import Link from "next/link"
import { tw } from "twind"
import type { PostData } from "./types"

dayjs.extend(relativeTime)

export default function PostCard({ data }: { data: PostData }) {
	const createdDate = dayjs(new Date(data.created_utc * 1000))

	return (
		<article className={tw`overflow-hidden bg-gray-800 shadow md:rounded-md`}>
			<div className={tw`p-3 space-y-1`}>
				<div className={tw`text-xs leading-snug text-gray-400`}>
					<Link href={`/r/${data.subreddit}`} passHref>
						<a className={tw`text-sm leading-none hover:underline`}>
							/r/<span className={tw`text-gray-100`}>{data.subreddit}</span>
						</a>
					</Link>
					{" • "}
					<Link href={`/u/${data.author}`} passHref>
						<a className={tw`inline-block hover:underline`}>
							posted by /u/{data.author}
						</a>
					</Link>{" "}
					<time
						className={tw`inline-block`}
						dateTime={createdDate.toISOString()}
					>
						<Link href={`/p/${data.id}`} passHref>
							<a className={tw`hover:underline`}>{createdDate.fromNow()}</a>
						</Link>
					</time>
				</div>

				<h1 className={tw`text-2xl font-light font-condensed`}>{data.title}</h1>
			</div>

			<div className={tw`bg-black bg-opacity-40`}>
				{data.post_hint === "image" && (
					<img
						src={data.url}
						role="presentation"
						className={tw`object-contain w-full`}
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
									className={tw`object-contain w-full h-full`}
								/>
							)}
						/>
					</AspectRatio>
				)}

				{data.secure_media?.reddit_video && (
					<video
						controls
						className={tw`object-contain w-full`}
						style={{ maxHeight: "calc(100vh - 8rem)" }}
					>
						<source src={data.secure_media.reddit_video.hls_url} />
						<source src={data.secure_media.reddit_video.fallback_url} />
					</video>
				)}
			</div>

			<div
				// slight visual bug here,
				// specificity issue is causing the bg opacity not to apply
				className={tw`grid grid-flow-col gap-2 p-2 bg-black bg-opacity-25 auto-cols-min`}
			>
				<button type="button" className={tw`transition hover:text-blue-500`}>
					<Icon name={upArrowIcon} />
				</button>
				<span>{data.ups}</span>
				<button type="button" className={tw`transition hover:text-yellow-500`}>
					<Icon name={downArrowIcon} />
				</button>
			</div>
		</article>
	)
}

function getPostGalleryUrls(data: PostData): string[] {
	const items: { media_id: string }[] = data.gallery_data.items
	return items
		.map(
			({ media_id }): string | undefined => data.media_metadata[media_id].s.u,
		)
		.filter(isTruthy)
		.map(unescape)
}
