
export function plusNumber(num: string) {
  return num.startsWith("+") ? num : "+" + num
}
