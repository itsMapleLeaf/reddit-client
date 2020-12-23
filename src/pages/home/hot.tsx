import HomePage from "features/home/HomePage"
import { useRedditListingQuery } from "features/reddit/queries"
import { Post } from "features/reddit/types"
import "twin.macro"

export default function HomeHot() {
	return (
		<HomePage
			subtitle="Hot"
			{...useRedditListingQuery<Post>({
				endpoint: "/hot.json",
			})}
		/>
	)
}
