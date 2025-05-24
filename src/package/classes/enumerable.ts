import { IEnumerable } from "../interfaces";
import { Lambda } from "../types";
import { ifThrow } from "../utilities/ifThrow";
import { Dictionary } from "./dictionary";
import { List } from "./list";

export class Enumerable<T> {
  constructor(
    protected collection: Array<T>,
  ) {
    this.collection = collection;
  }

  public append(item: T): IEnumerable<T> {
    ifThrow(item === null || item === undefined, 'item is null or undefined.');
    this.collection.push(item);
    return new List<T>(this.collection);
  }

  public where(predicate: Lambda<T, boolean>) {
    ifThrow(!predicate, 'predicate is required.');
    return new List(
      this.collection.filter((x) => {
        return predicate(x);
      }),
    );
  }

  public select<K>(selector: Lambda<T, K>) {
    ifThrow(!selector, 'selector is required.');
    return new List(
      this.collection.map((x) => {
        return selector(x);
      }),
    );
  }

  public count(predicate?: Lambda<T, boolean>) {
    return !predicate
      ? this.collection.length
      : this.collection.filter((x) => {
          return predicate(x);
        }).length;
  }

  public sum(lambda?: Lambda<T, number>) {
    let sum: number | undefined;
    const source = !lambda
      ? this.collection
      : this.collection.map((x) => lambda(x));

    source.every((value: T) => {
      if (typeof value === 'number') {
        sum = sum !== undefined ? sum + value : value;
      } else {
        sum = undefined;
        return false;
      }
      return true;
    });

    return sum;
  }

  public min(lambda?: Lambda<T, number>) {
    let min: number | undefined;
    const source = !lambda
      ? this.collection
      : this.collection.map((x) => lambda(x));

    source.every((value: T) => {
      if (typeof value === 'number') {
        min = min !== undefined ? Math.min(min, value) : value;
      } else {
        min = undefined;
        return false;
      }
      return true;
    });

    return min;
  }

  public max(lambda?: Lambda<T, number>) {
    let max: number | undefined;
    const source = !lambda
      ? this.collection
      : this.collection.map((x) => lambda(x));

    source.every((value: T) => {
      if (typeof value === 'number') {
        max = max !== undefined ? Math.max(max, value) : value;
      } else {
        max = undefined;
        return false;
      }
      return true;
    });

    return max;
  }

  public avg(lambda?: Lambda<T, number>) {
    const sum = this.sum(lambda);
    return sum !== undefined && !!this.count() ? sum / this.count() : undefined;
  }

  public toDictionary<K>(
    lambdaKey: Lambda<T, string>,
    lambdaValue: Lambda<T, K>,
  ) {
    ifThrow(
      lambdaKey === null || lambdaKey === undefined,
      'lambdaKey is a required parameter.',
    );
    ifThrow(
      lambdaValue === null || lambdaValue === undefined,
      'lambdaValue is a required parameter.',
    );
    ifThrow(this.collection === null || this.collection === undefined, 'Collection is null or undefined.');
    
    const dictionary = new Dictionary<K>({});
    this.collection.forEach((x) => {
      const key = lambdaKey(x);
      const item = lambdaValue(x);
      ifThrow(
        Object.prototype.hasOwnProperty.call(dictionary.toJSON(), key),
        `Duplicate key ${key} detected.`,
      );
      dictionary.set(key, item);
    });

    return dictionary;
  }

  public toJSON() {
    return this.collection;
  }
}