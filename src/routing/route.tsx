import type { ComponentType, ReactNode } from "react"
import { useMatch } from "react-router-dom"
import type { ParamsFromString } from "./types"

export function Route<
	Path extends string,
	Props extends ParamsFromString<Path>
>({
	path,
	component: Component,
	children,
}: {
	path: Path
	component?: ComponentType<Props>
	children?: ReactNode | ((params: Props) => ReactNode)
}) {
	const match = useMatch(path)

	if (!match) {
		return null
	}

	const params = match.params as Props

	if (Component) {
		return <Component {...params} />
	}

	if (typeof children === "function") {
		return <>{children(params)}</>
	}

	return <>{children}</>
}
