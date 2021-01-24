export type ListingResponse<T> = {
	data: {
		children: { data: T }[]
		after: string | null
	}
}
