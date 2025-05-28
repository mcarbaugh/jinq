import { describe, expect } from '@jest/globals';
import { List } from "@mcarbaugh/jinq";

describe('list', () => {
  describe('.orderByDescending()', () => {
    it('creates and returns a new jinq instance', () => {
      const source = [5, 10, 22, 23, 9, 6, 4];
      const a = new List(source);
      const b = a.orderByDescending((x) => x);
      return expect(a).not.toBe(b);
    });
    it('sorts the underlying array in descending order', () => {
      const source = [5, 10, 22, 23, 9, 6, 4];
      const a = new List(source);
      const b = a.orderByDescending((x) => x).toJSON();
      return expect(b).toEqual([23, 22, 10, 9, 6, 5, 4]);
    });
    it('doesn\'t modify the order of the source array', () => {
      const source = [5, 10, 22, 23, 9, 6, -1];
      const result = new List(source).orderByDescending(x => x).toJSON();
      expect(source).toEqual([5, 10, 22, 23, 9, 6, -1]); // sort order is not applied to the original array
      expect(result).toEqual([23, 22, 10, 9, 6, 5, -1]); // sort order is applied to the new list
      expect(source).not.toBe(result);                  // a new array is return from toArray
    })
    it('handles an empty array', () => {
      const source = [];
      const result = new List(source).orderByDescending(x => x).toJSON();
      expect(source).toEqual([]);      // sort order is not applied to the original array
      expect(result).toEqual([]);      // sort order is applied to the new list
      expect(source).not.toBe(result); // a new array is return from toArray
    })
    it('places nulls after numbers', () => {
      const source = [5, 10, 22, null, -10, null, 6, 4];
      const result = new List(source).orderByDescending(x => x).toJSON();
      expect(result).toEqual([22, 10, 6, 5, 4, -10, null, null]);
    })
    it('places nulls after strings', () => {
      const source = ['apple', null, 'dog'];
      const result = new List(source).orderByDescending(x => x).toJSON();
      expect(result).toEqual(['dog', 'apple', null]);
    })
  });
});
