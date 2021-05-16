export function distinctProperty<T, Tprop>(
  arr: T[],
  predicate: (item: T) => Tprop
): Tprop[] {
  function distinct<T>(value: T, index: number, self: T[]) {
    return self.indexOf(value) === index;
  }
  return arr.map(predicate).filter(distinct);
}
