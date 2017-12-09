import Lambda from './Lambda';

interface JinqEnumerable<T> {
    sortBy(lambda: Lambda<T>): JinqEnumerable<T>;
    sortByDescending(lambda: Lambda<T>): JinqEnumerable<T>;
    thenBy(lambda: Lambda<T>): JinqEnumerable<T>;
    thenByDescending(lambda: Lambda<T>): JinqEnumerable<T>;
    where(lambda: Lambda<T>): JinqEnumerable<T>;
    remove(lambda: Lambda<T>): JinqEnumerable<T>;
    select(lambda: Lambda<T>): JinqEnumerable<string | number | boolean | object>;
    toArray(): T[];
}

export default JinqEnumerable;