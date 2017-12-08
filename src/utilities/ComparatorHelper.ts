import Comparator from "../interfaces/Comparator";

export default class ComparatorHelper {
    public static composeComparators<T>(previousComp: Comparator<T>, nextComp: Comparator<T>) {
        return (x: T, y: T) => {
            const previousResult = previousComp(x, y);
            const nextResult = nextComp(x, y);
            return previousResult ? previousResult : nextResult ? nextResult : 0;
        }
    }
}