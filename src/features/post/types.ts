export type PostData = {
	id: string
	title?: string
	selftext?: string
	author?: string
	is_self?: boolean
	over_18?: boolean
	subreddit?: string
	post_hint?: "image"
	is_gallery?: boolean
	[key: string]: any
}
