import { useEffect } from "react"

type EventTargetLike<E extends Event> = {
	addEventListener(
		event: string,
		handler: (event: E) => void,
		options?: AddEventListenerOptions,
	): void

	removeEventListener(
		event: string,
		handler: (event: E) => void,
		options?: EventListenerOptions,
	): void
}

export function useDomEvent<E extends Event>(
	target: EventTargetLike<E> | undefined,
	event: string,
	callback: (event: E) => void,
	options?: AddEventListenerOptions,
) {
	useEffect(() => {
		target?.addEventListener(event, callback, options)
		return () => {
			target?.removeEventListener(event, callback, {
				capture: options?.capture,
			})
		}
	})
}

export function useWindowEvent<E extends keyof WindowEventMap>(
	event: E,
	callback: (event: WindowEventMap[E]) => void,
	options?: AddEventListenerOptions,
) {
	useDomEvent(
		typeof window !== "undefined" ? window : undefined,
		event,
		callback,
		options,
	)
}
