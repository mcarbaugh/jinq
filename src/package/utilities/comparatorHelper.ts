import { Comparator, Lambda } from "../types";

export class ComparatorHelper {
  public static composeComparators<T>(
    comparator: Comparator<T>,
    nestedComparator: Comparator<T>,
  ) {
    return (x: T, y: T) => {
      const comparatorResult = comparator(x, y);
      const nestedResult = nestedComparator(x, y);
      return comparatorResult
        ? comparatorResult
        : nestedResult
          ? nestedResult
          : 0;
    };
  }

  public static comparatorFactory<T, K>(
    selector: Lambda<T, K>,
    ascending: boolean,
  ) {
    return (x: T, y: T) => {
      if (selector(x) < selector(y)) {
        return ascending ? -1 : 1;
      }
      if (selector(x) > selector(y)) {
        return ascending ? 1 : -1;
      }
      return 0;
    };
  }
}
