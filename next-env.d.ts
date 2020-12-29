/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="@emotion/react/types/css-prop" />

import { css as cssImport } from "@emotion/react"
import styledImport from "@emotion/styled"
import "react"
import "twin.macro"

declare module "twin.macro" {
	// The styled and css imports
	const styled: typeof styledImport
	const css: typeof cssImport
}

declare module "react" {
	function createContext<T>(): Context<T | undefined>
}
