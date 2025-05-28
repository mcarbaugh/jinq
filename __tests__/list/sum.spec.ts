import { describe, expect } from '@jest/globals';
import { List } from "@mcarbaugh/jinq";

describe('List', () => {
  describe('.sum()', () => {
    it('returns sum of underlying array of numbers', () => {
      const list = new List([1, 2, 3, 4, -5, 6, 7, 8, 9, 10]);
      const result = list.sum();
      return expect(result).toEqual(45);
    });
    it('returns zero for an empty list', () => {
      const list = new List([]);
      const result = list.sum();
      return expect(result).toEqual(0);
    });
    it('returns zero for a list of nulls', () => {
      const list = new List([null, null, null]);
      const result = list.sum();
      return expect(result).toEqual(0);
    });
    it('yields same result whether chained with .select() or using selector argument', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result1 = list.sum(x => x.age);
      const result2 = list.select(x => x.age).sum();
      expect(result1).toEqual(result2);
    });
    it('chains with .where()', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result = list.where(x => x.age > 25).sum(x => x.age);
      expect(result).toEqual(74);
    });
    it('chains with .orderBy() and .thenBy()', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result = list.orderBy(x => x.lastName).thenBy(x => x.age).sum(x => x.age);
      expect(result).toEqual(99);
    });
    it('throws an error when non numeric, non null values appear in the source sequence', () => {
      let threw = false;
      try {
        const list = new List([1, 2, 3, '4', 'abc', null, 7, 8, 9]);
        list.sum();
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'type not supported.');
      }
      expect(threw).toEqual(true);
    });
  });
});
