export const distinctProperty = <T, Tprop>(
  arr: T[],
  predicate: (item: T) => Tprop
): Tprop[] =>
  arr
    .map(predicate)
    .filter(
      <T>(value: T, index: number, self: T[]) => self.indexOf(value) === index
    );
