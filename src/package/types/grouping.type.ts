import { IEnumerable } from "../interfaces/enumerable.interface";

export type Grouping<T> = { [key: string]: IEnumerable<T> };
