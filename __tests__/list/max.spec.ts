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
        { firstName: 'Susy', lastName: 'Q', age: 24 },
        { firstName: 'Jane', lastName: 'Doe', age: 24 },
      ]);
      const result = list.max(item => item.age);
      return expect(result).toEqual(44);
    });
    it('returns undefined for an empty list', () => {
      const list = new List([]);
      const result = list.max();
      return expect(result).toEqual(undefined);
    });
  });
});
