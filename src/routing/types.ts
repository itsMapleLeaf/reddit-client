export type ParamsFromString<PathString extends string> = {
	[_ in ParamNamesFromString<PathString>]: string
}

type ParamNamesFromString<
	PathString extends string
> = PathString extends `${infer Start}/${infer Rest}`
	? ParamPart<Start> | ParamNamesFromString<Rest>
	: ParamPart<PathString>

type ParamPart<PartString extends string> = PartString extends `:${infer S}`
	? S
	: never
