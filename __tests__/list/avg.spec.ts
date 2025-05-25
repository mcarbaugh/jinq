import { describe, expect } from '@jest/globals';
import { List } from "@mcarbaugh/jinq";

describe('list', () => {
  describe('.avg()', () => {
    it('returns avg of underlying array of numbers', () => {
      const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const result = list.avg();
      return expect(result).toEqual(5.5);
    });
    it('returns avg from a list of objects using a selector', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
      ]);
      const result = list.avg(item => item.age);
      return expect(result).toEqual(33);
    });
    it('returns the average from a list comprised of numbers and nulls, ignoring the nulls', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result = list.avg(item => item.age);
      expect(result).toEqual(33);
    });
    it('returns null for an empty list', () => {
      const list = new List([]);
      const result = list.avg();
      return expect(result).toEqual(null);
    });
    it('returns null for sequence of null values', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: null },
        { firstName: 'Susy', lastName: 'Q', age: null },
        { firstName: 'Jane', lastName: 'Doe', age: null },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result = list.avg(x => x.age);
      return expect(result).toEqual(null);
    });
  });
});
