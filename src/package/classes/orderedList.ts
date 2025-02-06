import { IOrderedEnumerable } from "../interfaces";
import { Comparator, Lambda } from "../types";
import { ComparatorHelper } from "../utilities/comparatorHelper";
import { ifThrow } from "../utilities/ifThrow";
import { Enumerable } from "./enumerable";

export class OrderedList<T> extends Enumerable<T> implements IOrderedEnumerable<T> {
  private composedComparator: Comparator<T>;

  constructor(
    protected collection: Array<T>,
    comparator: Comparator<T>,
  ) {
    super(collection);
    
    ifThrow(!comparator, 'A comparator is required to construct an OrderedList.');
    this.composedComparator = comparator;
    this.collection.sort(this.composedComparator);
  }

  public thenBy<K>(lambda: Lambda<T, K>) {
      ifThrow(this.composedComparator === null || this.composedComparator === undefined, 'Unable to resolve symbol thenBy.');
      return new OrderedList(
        [...this.collection],
        ComparatorHelper.composeComparators(
          this.composedComparator,
          ComparatorHelper.comparatorFactory(lambda, true),
        ),
      );
    }
  
    public thenByDescending<K>(lambda: Lambda<T, K>) {
      ifThrow(this.composedComparator === null || this.composedComparator === undefined, 'Unable to resolve symbol thenByDescending.');
      return new OrderedList(
        [...this.collection],
        ComparatorHelper.composeComparators(
          this.composedComparator,
          ComparatorHelper.comparatorFactory(lambda, false),
        ),
      );
    }
}