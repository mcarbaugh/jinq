import { Lambda } from "../types";

export interface IOrderedEnumerable<T> {
  thenBy<K>(lambda: Lambda<T, K>): IOrderedEnumerable<T>;
  thenByDescending<K>(lambda: Lambda<T, K>): IOrderedEnumerable<T>;
}