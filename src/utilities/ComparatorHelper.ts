import Comparator from '../interfaces/Comparator';
import Lambda from '../interfaces/Lambda';

export default class ComparatorHelper {
    public static composeComparators<T>(comparator: Comparator<T>, nestedComparator: Comparator<T>) {
        return (x: T, y: T) => {
            const comparatorResult = comparator(x, y);
            const nestedResult = nestedComparator (x, y);
            return comparatorResult ? comparatorResult : nestedResult ? nestedResult : 0;
        };
    }

    public static comparatorFactory<T>(lambda: Lambda<T>, ascending: boolean) {
        return (x: T, y: T) => {
            if (lambda(x) < lambda(y)) {
                return ascending ? -1 : 1;
            }
            if (lambda(x) > lambda(y)) {
                return ascending ? 1 : -1;
            }
            return 0;
        };
    }
}