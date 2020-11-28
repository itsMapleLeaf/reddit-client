import * as z from "zod"

export type LoginBody = z.infer<typeof loginBodySchema>
export const loginBodySchema = z.object({
	authCode: z.string(),
})

export type SessionDto = z.infer<typeof sessionDtoSchema>
export const sessionDtoSchema = z.object({
	session: z
		.object({ access_token: z.string(), refresh_token: z.string() })
		.nonstrict()
		.optional(),
})
