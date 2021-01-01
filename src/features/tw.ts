import { create } from "twind"
import { asyncVirtualSheet } from "twind/server"
import tailwindConfig from "../../tailwind.config"

export const sheet = asyncVirtualSheet()

export const { tw } = create({
	...tailwindConfig,
	sheet: typeof window !== "undefined" ? sheet : undefined,
})
