/**
 * modulo but with proper native looping
 * https://stackoverflow.com/a/64808910/1332403
 */
export function mod(n: number, m: number) {
	return ((n % m) + m) % m
}
