import { Dictionary } from "../classes/dictionary";
import { Grouping, Lambda } from "../types";
import { IOrderedEnumerable } from "./orderedEnumerable.interface";

export interface IEnumerable<T> {
  append(item: T): IEnumerable<T>;
  orderBy<K>(selector: Lambda<T, K>): IOrderedEnumerable<T>;
  orderByDescending<K>(selector: Lambda<T, K>): IOrderedEnumerable<T>;
  where(predicate: Lambda<T, boolean>): IEnumerable<T>;
  select<K>(selector: Lambda<T, K>): IEnumerable<K>;
  count(predicate?: Lambda<T, boolean>): number;
  sum(selector?: Lambda<T, number>): number;
  average(selector?: Lambda<T, number>): number | null;
  min(selector?: Lambda<T, number>): number | null;
  max(selector?: Lambda<T, number>): number | null;
  toJSON(): Array<T>;
  toDictionary<K>(
    lambdaKey: Lambda<T, string>,
    lambdaValue: Lambda<T, K>,
  ): Dictionary<string, K>;
  groupBy(lambda: Lambda<T, string>): Grouping<T>;
}