import { Falsy } from "utility-types"

export const toggle = (bool: boolean) => !bool

type IsTruthy = <T>(value: T) => value is Exclude<T, Falsy>
export const isTruthy = (Boolean as unknown) as IsTruthy
