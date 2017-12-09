import ComparatorHelper from './utilities/ComparatorHelper';
import Comparator from './interfaces/Comparator';
import JinqEnumerable from './interfaces/JinqEnumerable';
import Lambda from './interfaces/Lambda';

export default class Jinq<T> implements JinqEnumerable<T> {
    private collection: T[];
    private composedComparator: Comparator<T>;

    public constructor(collection: T[]) {
        this.collection = collection;
        this.sortBy = this.sortBy.bind(this);
        this.toArray = this.toArray.bind(this);
    }

    public sortBy(lambda: Lambda<T>) {
        this.composedComparator = (x: T, y: T) => {
            if (lambda(x) > lambda(y)) {
                return 1;
            }
            if (lambda(x) < lambda(y)) {
                return -1;
            }
            return 0;
        };
        return this;
    }

    public sortByDescending(lambda: Lambda<T>) {
        this.composedComparator = (x: T, y: T) => {
            if (lambda(x) > lambda(y)) {
                return -1;
            }
            if (lambda(x) < lambda(y)) {
                return 1;
            }
            return 0;
        };
        return this;
    }

    public thenBy(lambda: Lambda<T>) {
        this.composedComparator = ComparatorHelper.composeComparators(
            this.composedComparator,
            (x: T, y: T) => {
                if (lambda(x) > lambda(y)) {
                    return 1;
                }
                if (lambda(x) < lambda(y)) {
                    return -1;
                }
                return 0;
            },
        );
        return this;
    }

    public thenByDescending(lambda: Lambda<T>) {
        this.composedComparator = ComparatorHelper.composeComparators(
            this.composedComparator,
            (x: T, y: T) => {
                if (lambda(x) > lambda(y)) {
                    return -1;
                }
                if (lambda(x) < lambda(y)) {
                    return 1;
                }
                return 0;
            },
        );
        return this;
    }

    public execute() {
        const comparator = this.composedComparator;
        if (comparator) {
            this.collection.sort(comparator);
        }
        return new Jinq(this.collection);
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

    public toArray() {
        return this.collection.slice();
    }
}
