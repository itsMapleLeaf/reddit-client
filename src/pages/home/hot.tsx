import HomeLayout from "features/core/HomeLayout"
import InfinitePostList from "features/reddit/InfinitePostList"
import { useRedditHotQuery } from "features/reddit/queries"
import "twin.macro"

export default function HomeHot() {
	return (
		<HomeLayout subtitle="Hot">
			<InfinitePostList query={useRedditHotQuery()} />
		</HomeLayout>
	)
}
