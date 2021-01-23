import type {
	ComponentChildren,
	ComponentType,
	FunctionComponent,
} from "preact"
import { useLayoutEffect, useState } from "preact/hooks"
import { useMatch } from "react-router-dom"
import type { ParamsFromString } from "./route"

const cache = new Map<string, FunctionComponent>()

export function LazyRoute<Path extends string>({
	path,
	loader,
	placeholder,
}: {
	path: Path
	loader: () => Promise<Record<string, ComponentType<ParamsFromString<Path>>>>
	placeholder: ComponentChildren
}) {
	const [Component, setComponent] = useState<
		ComponentType<ParamsFromString<Path>> | undefined
	>()

	const match = useMatch(path)
	const hasMatch = match != null

	useLayoutEffect(() => {
		if (hasMatch) {
			let cancelled = false

			loader().then((result) => {
				if (cancelled) return
				const component = Object.values(result).find(isComponent)
				if (component) {
					setComponent(() => component)
					cache.set(path, component)
				}
			})

			return () => {
				cancelled = true
			}
		}
	}, [hasMatch, path, loader])

	if (!match) {
		return null
	}

	if (!Component) {
		return <>{placeholder}</>
	}

	return <Component {...match.params} />
}

function isComponent(thing: unknown): thing is FunctionComponent {
	return (
		typeof thing === "function" && thing.name[0] === thing.name[0].toUpperCase()
	)
}
