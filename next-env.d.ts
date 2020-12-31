/// <reference types="next" />
/// <reference types="next/types/global" />

import "react"

declare module "react" {
	function createContext<T>(): Context<T | undefined>
}
