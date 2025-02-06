import { describe, expect } from '@jest/globals';
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
      const b = a.orderBy((x) => x).toJSON();
      return expect(b).toEqual([4, 5, 6, 9, 10, 22, 23]);
    });
    it('doesn\'t modify the order of the source array', () => {
      const source = [5, 10, 22, 23, 9, 6, 4];
      const result = new List(source).orderBy(x => x).toJSON();
      expect(source).toEqual([5, 10, 22, 23, 9, 6, 4]); // sort order is not applied to the original array
      expect(result).toEqual([4, 5, 6, 9, 10, 22, 23]); // sort order is applied to the new list
      expect(source).not.toBe(result);                  // a new array is return from toArray
    })
    it('handles an empty array', () => {
      const source = [];
      const result = new List(source).orderBy(x => x).toJSON();
      expect(source).toEqual([]);      // sort order is not applied to the original array
      expect(result).toEqual([]);      // sort order is applied to the new list
      expect(source).not.toBe(result); // a new array is return from toArray
    })
  });
});
