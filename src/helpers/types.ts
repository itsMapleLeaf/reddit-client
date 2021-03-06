export type OptionalKeys<O, K extends keyof O> = Omit<O, K> &
	Partial<Pick<O, K>>
