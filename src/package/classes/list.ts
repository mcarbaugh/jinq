import { IEnumerable } from '../interfaces/enumerable.interface';
import { Grouping, Lambda } from '../types';
import { ComparatorHelper } from '../utilities/comparatorHelper';
import { Enumerable } from './enumerable';
import { OrderedList } from './orderedList';

export class List<T> extends Enumerable<T> implements IEnumerable<T> {
  constructor(
    protected source: Array<T>,
  ) {
    super(source);
  }

  public orderBy<K>(selector: Lambda<T, K>) {
    return new OrderedList(
      [...this.source],
      ComparatorHelper.comparatorFactory(selector, true),
    );
  }

  public orderByDescending<K>(selector: Lambda<T, K>) {
    return new OrderedList(
      [...this.source],
      ComparatorHelper.comparatorFactory(selector, false),
    );
  }

  public groupBy(lambda: Lambda<T, string>) {
    const grouping: Grouping<T> = {};
    this.source.forEach((x) => {
      const key = lambda(x);
      if (!Object.prototype.hasOwnProperty.call(grouping, key)) {
        grouping[key] = new List<T>([]);
      }
      grouping[key] = grouping[key].append(x);
    });
    return grouping;
  }
}
