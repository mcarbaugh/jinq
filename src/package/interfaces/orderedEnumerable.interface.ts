import { Dictionary } from "../classes/dictionary";
import { Lambda } from "../types";

export interface IOrderedEnumerable<T> {
  thenBy<K>(lambda: Lambda<T, K>): IOrderedEnumerable<T>;
  thenByDescending<K>(lambda: Lambda<T, K>): IOrderedEnumerable<T>;
  toDictionary<K>(
      lambdaKey: Lambda<T, string>,
      lambdaValue: Lambda<T, K>,
    ): Dictionary<string, K>;
}