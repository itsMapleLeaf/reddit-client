import HomeLayout from "features/core/HomeLayout"
import InfinitePostList from "features/reddit/InfinitePostList"
import { useRedditNewQuery } from "features/reddit/queries"
import "twin.macro"

export default function HomeNew() {
	return (
		<HomeLayout subtitle="New">
			<InfinitePostList query={useRedditNewQuery()} />
		</HomeLayout>
	)
}
