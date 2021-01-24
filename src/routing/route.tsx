import type { ComponentChildren, ComponentType } from "preact"
import { useMatch } from "react-router-dom"

export type ParamsFromString<PathString extends string> = {
	[_ in ParamNamesFromString<PathString>]: string
}

type ParamNamesFromString<
	PathString extends string
> = PathString extends `${infer Start}/${infer Rest}`
	? ParamPart<Start> | ParamNamesFromString<Rest>
	: ParamPart<PathString>

type ParamPart<PartString extends string> = PartString extends `:${infer S}`
	? S
	: never

export function Route<PathT extends string>({
	path,
	component: Component,
	children,
}: {
	path: PathT
	component?: ComponentType<ParamsFromString<PathT>>
	children?:
		| ComponentChildren
		| ((params: ParamsFromString<PathT>) => ComponentChildren)
}) {
	const match = useMatch(path)

	if (!match) {
		return null
	}

	const params = match.params as ParamsFromString<PathT>

	if (Component) {
		return <Component {...params} />
	}

	if (typeof children === "function") {
		return <>{children(params)}</>
	}

	return <>{children}</>
}
