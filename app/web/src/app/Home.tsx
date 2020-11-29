import { useRedditQuery } from "../reddit/fetch"
import { ListingResponse } from "../reddit/listing"

export function Home() {
	const { data, error, isLoading } = useRedditQuery<ListingResponse>("/hot")

	return (
		<main>
			{isLoading && <p>Loading...</p>}
			{error && <p>{String(error)}</p>}
			{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
		</main>
	)
}
