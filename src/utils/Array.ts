export const distinctProperty = <T, Tprop>(
  arr: T[],
  predicate: (item: T) => Tprop
): Tprop[] =>
  arr
    .map(predicate)
    .filter(
      (value: Tprop, index: number, self: Tprop[]) =>
        self.indexOf(value) === index
    );
