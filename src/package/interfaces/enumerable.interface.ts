import { Dictionary } from "../classes/dictionary";
import { Grouping, Lambda } from "../types";
import { IOrderedEnumerable } from "./orderedEnumerable.interface";

export interface IEnumerable<T> {
  append(item: T): IEnumerable<T>;
  orderBy<K>(lambda: Lambda<T, K>): IOrderedEnumerable<T>;
  orderByDescending<K>(lambda: Lambda<T, K>): IOrderedEnumerable<T>;
  where(lambda: Lambda<T, boolean>): IEnumerable<T>;
  select<K>(lambda: Lambda<T, K>): IEnumerable<K>;
  count(lambda?: Lambda<T, boolean>): number;
  sum(lambda?: Lambda<T, number>): number | undefined;
  average(selector?: Lambda<T, number>): number | null;
  min(lambda?: Lambda<T, number>): number | null;
  max(lambda?: Lambda<T, number>): number | null;
  toJSON(): Array<T>;
  toDictionary<K>(
    lambdaKey: Lambda<T, string>,
    lambdaValue: Lambda<T, K>,
  ): Dictionary<K>;
  groupBy(lambda: Lambda<T, string>): Grouping<T>;
}