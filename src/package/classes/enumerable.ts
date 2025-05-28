import { IEnumerable } from "../interfaces";
import { Lambda } from "../types";
import { checkedNumber } from "../utilities/checks";
import { ifThrow } from "../utilities/ifThrow";
import { Dictionary } from "./dictionary";
import { List } from "./list";

export class Enumerable<T> {
  constructor(
    protected source: Array<T>,
  ) {
    this.source = source;
  }

  public append(item: T): IEnumerable<T> {
    ifThrow(item === null || item === undefined, 'item is null or undefined.');
    this.source.push(item);
    return new List<T>(this.source);
  }

  public where(predicate: Lambda<T, boolean>) {
    ifThrow(!predicate, 'predicate is required.');
    return new List(
      this.source.filter((x) => {
        return predicate(x);
      }),
    );
  }

  public select<K>(selector: Lambda<T, K>) {
    ifThrow(!selector, 'selector is required.');
    return new List(
      this.source.map((x) => {
        return selector(x);
      }),
    );
  }

  public count(predicate?: Lambda<T, boolean>) {
    return !predicate
      ? this.source.length
      : this.source.filter((x) => {
          return predicate(x);
        }).length;
  }

  public sum(selector?: Lambda<T, number>) {
    let sum: number | undefined;
    const source = !selector
      ? this.source
      : this.source.map((x) => selector(x));

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

  public min(selector?: Lambda<T, number>) {
    let min: number | null = null;
    this.source.forEach(item => {
      const value = !!selector ? selector(item) : item;
      const checked = checkedNumber(value);
      if (checked !== null) {
        if (min === null) {
          min = checked;
        } else if (checked < min) {
          min = checked;
        }
      }
    });
    return min;
  }

  public max(selector?: Lambda<T, number>) {
    let max: number | null = null;
    this.source.forEach(item => {
      const value = !!selector ? selector(item) : item;
      const checked = checkedNumber(value);
      if (checked !== null) {
        if (max === null) {
          max = checked;
        } else if (checked > max) {
          max = checked;
        }
      }
    });
    return max;
  }

  public average(selector?: Lambda<T, number>) {
    let count = 0;
    let sum: number | null = null;
    this.source.forEach(item => {
      const value = !!selector ? selector(item) : item;
      const checked = checkedNumber(value);
      if (checked !== null) {
        if (sum === null) {
          sum = checked;
        } else {
          sum += checked;
        }
        count++;
      }
    });
    return sum !== null && count > 0
      ? sum / count
      : null;
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
    ifThrow(this.source === null || this.source === undefined, 'Collection is null or undefined.');
    
    const dictionary = new Dictionary<K>({});
    this.source.forEach((x) => {
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
    return this.source;
  }
}