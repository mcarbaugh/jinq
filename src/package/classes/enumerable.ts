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
    let sum: number = 0;
    this.source.forEach(item => {
      const value = !!selector ? selector(item) : item;
      const checked = checkedNumber(value);
      if (checked !== null) {
        sum += checked;
      }
    });
    return sum
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

  public toDictionary<TValue>(
    keySelector: Lambda<T, string>,
    valueSelector: Lambda<T, TValue>,
  ) {
    ifThrow(
      keySelector === null || keySelector === undefined,
      'lambdaKey is a required parameter.',
    );
    ifThrow(
      valueSelector === null || valueSelector === undefined,
      'lambdaValue is a required parameter.',
    );
    ifThrow(this.source === null || this.source === undefined, 'Collection is null or undefined.');
    
    const dictionary = new Dictionary<string, TValue>();
    this.source.forEach((x) => {
      const key = keySelector(x);
      const item = valueSelector(x);
      dictionary.set(key, item);
    });

    return dictionary;
  }

  public toJSON() {
    return this.source;
  }
}