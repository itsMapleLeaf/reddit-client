import type { ComponentChildren, ComponentType } from "preact"
import { useEffect, useState } from "preact/hooks"
import { useMatch } from "react-router-dom"
import type { ParamsFromString } from "./route"

export type LazyRouteProps<Path extends string> = {
	path: Path
	loader: () => Promise<LoaderResult<ComponentType<ParamsFromString<Path>>>>
	placeholder: ComponentChildren
}

type LoaderResult<Component> =
	| Component
	| { [key: string]: Component | undefined }

const cache = new Map<string, ComponentType>()

export function LazyRoute<Path extends string>({
	path,
	loader,
	placeholder,
}: LazyRouteProps<Path>) {
	const [Component, setComponent] = useState(() => cache.get(path))

	const match = useMatch(path)
	const hasMatch = match != null

	useEffect(() => {
		if (hasMatch) {
			let cancelled = false

			loader().then((result) => {
				if (cancelled) return

				const component =
					typeof result === "function"
						? result
						: result.default ??
						  Object.values(result).find<ComponentType>(isFunction)

				if (component) {
					setComponent(() => component)
					cache.set(path, component)
				}
			})

			return () => {
				cancelled = true
			}
		}
	})

	if (!match) {
		return null
	}

	if (!Component) {
		return <>{placeholder}</>
	}

	return <Component {...match.params} />
}

function isFunction(value: unknown): value is (...args: any[]) => any {
	return typeof value === "function"
}
