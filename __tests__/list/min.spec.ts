import { describe, expect } from '@jest/globals';
import { List } from "@mcarbaugh/jinq";

describe('List', () => {
  describe('.min()', () => {
    it('returns min of underlying array of numbers', () => {
      const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const result = list.min();
      return expect(result).toEqual(1);
    });
    it('returns min from a list of objects using a selector', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 24 },
        { firstName: 'Jane', lastName: 'Doe', age: 15 },
      ]);
      const result = list.min(item => item.age);
      return expect(result).toEqual(15);
    });
    it('returns null for an empty list', () => {
      const list = new List([]);
      const result = list.min();
      return expect(result).toEqual(null);
    });
    it('ignores nulls and returns the min of remaining values', () => {
      const list = new List([1, 2, 1, null, null, 22, 35, 23, -5]);
      const result = list.min();
      expect(result).toEqual(-5);
    });
    it('yields same result whether chained with .select() or using predicate', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result1 = list.min(x => x.age);
      const result2 = list.select(x => x.age).min();
      expect(result1).toEqual(result2);
    });
    it('chains with .where()', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result = list.where(x => x.age > 25).min(x => x.age);
      expect(result).toEqual(30);
    });
    it('chains with .orderBy() and .thenBy()', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result = list.orderBy(x => x.lastName).thenBy(x => x.age).min(x => x.age);
      expect(result).toEqual(25);
    });
    it('throws an error when non numeric, non null values appear in the source sequence', () => {
      let threw = false;
      try {
        const list = new List([1, 2, 3, '4', 'abc', 6, 7, 8, 9]);
        list.min();
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'type not supported.');
      }
      expect(threw).toEqual(true);
    });
  });
});
