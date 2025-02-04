import { List } from "jinq";

describe('jinq', () => {
  describe('orderBy()', () => {
    it('creates and returns a new jinq instance', () => {
      const source = [5, 10, 22, 23, 9, 6, 4];
      const a = new List(source);
      const b = a.orderBy((x) => x);
      return expect(a).not.toBe(b);
    });
    it('sorts the underlying array in ascending order', () => {
      const source = [5, 10, 22, 23, 9, 6, 4];
      const a = new List(source);
      const b = a.orderBy((x) => x).toArray();
      return expect(b).toEqual([4, 5, 6, 9, 10, 22, 23]);
    });
  });
});
