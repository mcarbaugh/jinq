import { IEnumerable } from '../interfaces/enumerable.interface';
import { Grouping, Lambda } from '../types';
import { ComparatorHelper } from '../utilities/comparatorHelper';
import { Enumerable } from './enumerable';
import { OrderedList } from './orderedList';

export class List<T> extends Enumerable<T> implements IEnumerable<T> {
  constructor(
    protected collection: Array<T>,
  ) {
    super(collection);
  }

  public orderBy<K>(lambda: Lambda<T, K>) {
    return new OrderedList(
      [...this.collection],
      ComparatorHelper.comparatorFactory(lambda, true),
    );
  }

  public orderByDescending<K>(lambda: Lambda<T, K>) {
    return new OrderedList(
      [...this.collection],
      ComparatorHelper.comparatorFactory(lambda, false),
    );
  }

  public groupBy(lambda: Lambda<T, string>) {
    const grouping: Grouping<T> = {};
    this.collection.forEach((x) => {
      const key = lambda(x);
      if (!Object.prototype.hasOwnProperty.call(grouping, key)) {
        grouping[key] = new List<T>([]);
      }
      grouping[key] = grouping[key].append(x);
    });
    return grouping;
  }
}
