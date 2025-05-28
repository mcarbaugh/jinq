import { describe, expect } from '@jest/globals';
import { List } from "@mcarbaugh/jinq";

describe('List', () => {
  describe('.max()', () => {
    it('returns max of underlying array of numbers', () => {
      const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const result = list.max();
      return expect(result).toEqual(10);
    });
    it('returns max from a list of objects using a selector', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: null },
        { firstName: 'Jane', lastName: 'Doe', age: 24 },
      ]);
      const result = list.max(item => item.age);
      return expect(result).toEqual(44);
    });
    it('returns null for an empty list', () => {
      const list = new List([]);
      const result = list.max();
      return expect(result).toEqual(null);
    });
    it('yields same result whether chained with .select() or using selector argument', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result1 = list.max(x => x.age);
      const result2 = list.select(x => x.age).max();
      expect(result1).toEqual(result2);
    });
    it('chains with .where()', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result = list.where(x => x.age < 44).max(x => x.age);
      expect(result).toEqual(30);
    });
    it('chains with .orderBy() and .thenBy()', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result = list.orderBy(x => x.lastName).thenBy(x => x.age).max(x => x.age);
      expect(result).toEqual(44);
    });
    it('throws an error when non numeric, non null values appear in the source sequence', () => {
      let threw = false;
      try {
        const list = new List([1, 2, 3, '4', 'abc', 6, 7, 8, 9]);
        list.max();
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'type not supported.');
      }
      expect(threw).toEqual(true);
    });
  });
});
