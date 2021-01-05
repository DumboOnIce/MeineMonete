export function roundUp(valueOfThisYear: number): number {
  return Math.round((valueOfThisYear + Number.EPSILON) * 100) / 100;
}
