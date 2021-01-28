type Falsy = false | "" | 0 | null | undefined
type IsTruthyFn = <T>(value: T) => value is Exclude<T, Falsy>
export const isTruthy = (Boolean as unknown) as IsTruthyFn
