import { useLocation } from "react-router-dom"

export function useSearchParam(name: string) {
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	return searchParams.get(name) ?? undefined
}
