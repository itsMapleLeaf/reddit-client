/**
 * modulo but with proper native looping
 * https://stackoverflow.com/a/64808910/1332403
 */
export const mod = (n: number, m: number) => ((n % m) + m) % m
