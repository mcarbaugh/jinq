import Comparator from '../interfaces/Comparator';
import ComparatorHelper from '../utilities/ComparatorHelper';
import Jinq from "../Jinq";
import Lambda from '../interfaces/Lambda';

export default class OrderedJinq<T> extends Jinq<T> {
    private comparator: Comparator<T>;

    public constructor(collection: T[], lambda: Lambda<T>, compose: boolean) {
        super(collection);
        this.comparator = ComparatorHelper.composeComparators(
            (compose) ? this.comparator : null,
            (x: T, y: T) => {
                if (lambda(x) < lambda(y)) {
                    return 1;
                }
                if (lambda(x) > lambda(y)) {
                    return -1;
                }
                return 0;
            }
        );
        this.collection
            .sort(this.comparator);
    }
}