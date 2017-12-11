import Comparator from './interfaces/Comparator';
import ComparatorHelper from './utilities/ComparatorHelper';
import JinqEnumerable from './interfaces/JinqEnumerable';
import Lambda from './interfaces/Lambda';

export default class Jinq<T> implements JinqEnumerable<T> {
    private composedComparator: Comparator<T>;

    public constructor(private collection: T[], comparator?: Comparator<T>) {
        this.collection = collection;
        if (comparator) {
            this.collection.sort(comparator);
            this.composedComparator = comparator;
        }
    }

    public sortBy(lambda: Lambda<T>) {
        return new Jinq(
            this.collection,
            ComparatorHelper.comparatorFactory(lambda, true)
        );
    }

    public sortByDescending(lambda: Lambda<T>) {
        return new Jinq(
            this.collection,
            ComparatorHelper.comparatorFactory(lambda, false)
        );
    }

    public thenBy(lambda: Lambda<T>) {
        return new Jinq(
            this.collection,
            ComparatorHelper.composeComparators(
                this.composedComparator,
                ComparatorHelper.comparatorFactory(lambda, true)
            )
        );
    }

    public thenByDescending(lambda: Lambda<T>) {
        return new Jinq(
            this.collection,
            ComparatorHelper.composeComparators(
                this.composedComparator,
                ComparatorHelper.comparatorFactory(lambda, false)
            )
        );
    }

    public where(lambda: Lambda<T>) {
        return new Jinq(this.collection
            .filter(x => {
                return lambda(x);
            })
        );
    }

    public remove(lambda: Lambda<T>) {
        return new Jinq(this.collection
            .filter(x => {
                return(!lambda(x));
            })
        );
    }

    public select(lambda: Lambda<T>) {
        return new Jinq(this.collection
            .map(x => {
                return lambda(x);
            })
        );
    }

    public count(lambda?: Lambda<T>) {
        return (!lambda) 
            ? this.collection.length 
            : this.collection
                .filter(x => {
                    return lambda(x);
                })
                .length;
    }

    public sum() {
        let sum: number | undefined;
        this.collection
            .every((value: T, index: number) => {
                if (typeof value === 'number') {
                    sum = (sum !== undefined) ? sum + value : value;
                } else {
                    sum = undefined;
                    return false;
                }
                return true;
            });

        return sum;
    }

    public min() {
        let min: number | undefined;
        this.collection
            .every((value: T, index: number) => {
                if (typeof value === 'number') {
                    min = (min !== undefined) ? Math.min(min, value) : value;
                } else {
                    min = undefined;
                    return false;
                }
                return true;
            });

        return min;
    }

    public max() {
        let max: number | undefined;
        this.collection
            .every((value: T, index: number) => {
                if (typeof value === 'number') {
                    max = (max !== undefined) ? Math.max(max, value) : value;
                } else {
                    max = undefined;
                    return false;
                }
                return true;
            });

        return max;
    }

    public avg() {
        const sum = this.sum();
        return (sum !== undefined) ? sum / this.count() : undefined;
    }

    public toArray() {
        return this.collection.slice();
    }
}
