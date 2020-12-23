import HomePage from "features/home/HomePage"
import { useRedditListingQuery } from "features/reddit/queries"
import { Post } from "features/reddit/types"
import "twin.macro"

export default function HomeNew() {
	return (
		<HomePage
			subtitle="New"
			{...useRedditListingQuery<Post>({
				endpoint: "/new.json",
			})}
		/>
	)
}
