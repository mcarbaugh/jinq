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
      const xVal = selector(x)
      const yVal = selector(y)
      if ((xVal === null || xVal === undefined) && (yVal === null || yVal === undefined)) {
        return 0;
      } else if (xVal === null || xVal === undefined){
        return ascending ? -1 : 1;
      } else if(yVal === null || yVal === undefined) {
        return ascending ? 1 : -1;
      } else {
        if (xVal < yVal) {
          return ascending ? -1 : 1;
        } else if (xVal > yVal) {
          return ascending ? 1 : -1;
        } else {
          return 0;
        }
      }
    };
  }
}
