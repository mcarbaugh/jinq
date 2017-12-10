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
        let sum: number;
        for (const value of this.collection) {
            if (typeof value === "number") {
                sum = (sum) ? sum + value : value;
            } else {
                sum = undefined;
                break;
            }
        }

        return sum || -1;
    }

    public min() {
        let min: number;
        for (const value of this.collection) {
            if (typeof value === "number") {
                min = (min) ? Math.min(min, value) : value;
            } else {
                min = undefined;
                break;
            }
        }

        return min || -1;
    }

    public max() {
        let max;
        for (const value of this.collection) {
            if (typeof value === "number") {
                max = (max) ? Math.max(max, value) : value;
            } else {
                max = undefined;
                break;
            }
        }

        return max || -1;
    }

    public average() {
        return (this.sum() / this.collection.length);
    }

    public toArray() {
        return this.collection.slice();
    }
}
