import { Dictionary } from "../classes/dictionary";
import { Grouping, Lambda } from "../types";

export interface Enumerable<T> {
  append(item: T): Enumerable<T>;
  sortBy<K>(lambda: Lambda<T, K>): Enumerable<T>;
  sortByDescending<K>(lambda: Lambda<T, K>): Enumerable<T>;
  thenBy<K>(lambda: Lambda<T, K>): Enumerable<T>;
  thenByDescending<K>(lambda: Lambda<T, K>): Enumerable<T>;
  where(lambda: Lambda<T, boolean>): Enumerable<T>;
  remove<K>(lambda: Lambda<T, K>): Enumerable<T>;
  select<K>(lambda: Lambda<T, K>): Enumerable<K>;
  count(lambda?: Lambda<T, boolean>): number;
  sum(lambda?: Lambda<T, number>): number | undefined;
  avg(lambda?: Lambda<T, number>): number | undefined;
  min(lambda?: Lambda<T, number>): number | undefined;
  max(lambda?: Lambda<T, number>): number | undefined;
  toArray(): Array<T>;
  toDictionary<K>(
    lambdaKey: Lambda<T, string>,
    lambdaValue: Lambda<T, K>,
  ): Dictionary<K>;
  groupBy(lambda: Lambda<T, string>): Grouping<T>;
}