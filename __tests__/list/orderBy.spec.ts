import { describe, expect } from '@jest/globals';
import { List, OrderedList } from "@mcarbaugh/jinq";

describe('list', () => {
  describe('.orderBy()', () => {
    it('returns a new OrderedList', () => {
      const source = [
        { firstName: 'John', lastName: 'Smith', favoriteColor: 'blue' },
        { firstName: 'Susy', lastName: 'Q', favoriteColor: 'green' },
        { firstName: 'Jane', lastName: 'Doe', favoriteColor: 'blue' },
      ];

      const result = new List(source).orderBy(x => x.lastName);
      expect(result).not.toBe(source);
      expect(result).toBeInstanceOf(OrderedList);
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
    it('places nulls before numbers', () => {
      const source = [5, 10, 22, null, -10, 6, 4, null];
      const result = new List(source).orderBy(x => x).toJSON();
      expect(result).toEqual([null, null, -10, 4, 5, 6, 10, 22]);
    })
    it('places nulls before strings', () => {
      const source = ['apple', null, 'dog'];
      const result = new List(source).orderBy(x => x).toJSON();
      expect(result).toEqual([null, 'apple', 'dog']);
    })
  });
});
