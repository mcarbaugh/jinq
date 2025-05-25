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
    it('returns undefined for an empty list', () => {
      const list = new List([]);
      const result = list.min();
      return expect(result).toEqual(undefined);
    });
  });
});
