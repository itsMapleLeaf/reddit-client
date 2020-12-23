import { useEffect } from "react"

export function useDomEvent<E extends keyof WindowEventMap>(
	target: Window | undefined,
	event: E,
	callback: (event: WindowEventMap[E]) => void,
): void

export function useDomEvent<E extends keyof DocumentEventMap>(
	target: Document | undefined,
	event: E,
	callback: (event: DocumentEventMap[E]) => void,
): void

export function useDomEvent<E extends keyof HTMLElementEventMap>(
	target: HTMLElement | undefined,
	event: E,
	callback: (event: HTMLElementEventMap[E]) => void,
): void

export function useDomEvent(
	target: EventTarget | undefined,
	event: string,
	callback: (event: Event) => void,
) {
	useEffect(() => {
		target?.addEventListener(event, callback)
		return () => target?.removeEventListener(event, callback)
	})
}
