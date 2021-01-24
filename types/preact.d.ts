import "preact/hooks"
declare module "preact/hooks" {
	export function useState<S>(): [S | undefined, StateUpdater<S | undefined>]
}
