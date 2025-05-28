import { describe, expect } from '@jest/globals';
import { List } from "@mcarbaugh/jinq";

describe('list', () => {
  describe('.average()', () => {
    it('returns average of underlying array of numbers', () => {
      const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const result = list.average();
      return expect(result).toEqual(5.5);
    });
    it('returns average from a list of objects using a selector', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
      ]);
      const result = list.average(item => item.age);
      return expect(result).toEqual(33);
    });
    it('returns the average from a list comprised of numbers and nulls, ignoring the nulls', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result = list.average(item => item.age);
      expect(result).toEqual(33);
    });
    it('returns null for an empty list', () => {
      const list = new List([]);
      const result = list.average();
      return expect(result).toEqual(null);
    });
    it('returns null for sequence of null values', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: null },
        { firstName: 'Susy', lastName: 'Q', age: null },
        { firstName: 'Jane', lastName: 'Doe', age: null },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result = list.average(x => x.age);
      return expect(result).toEqual(null);
    });
    it('yields same result whether chained with .select() or using selector argument', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result1 = list.average(x => x.age);
      const result2 = list.select(x => x.age).average();
      expect(result1).toEqual(result2);
    });
    it('chains with .where()', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result = list.where(x => x.age > 25).average(x => x.age);
      expect(result).toEqual(37);
    });
    it('chains with .orderBy() and .thenBy()', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result = list.orderBy(x => x.lastName).thenBy(x => x.age).average(x => x.age);
      expect(result).toEqual(33);
    });
    it('returns average from a list of positive and negative numbers', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 10 },
        { firstName: 'Susy', lastName: 'Q', age: -10 },
      ]);
      const result = list.average(x => x.age);
      expect(result).toEqual(0);
    });
    it('throws an error when non numeric, non null values appear in the source sequence', () => {
      let threw = false;
      try {
        const list = new List([1, 2, 3, '4', 'abc', null, 7, 8, 9]);
        list.average();
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'type not supported.');
      }
      expect(threw).toEqual(true);
    });
  });
});
