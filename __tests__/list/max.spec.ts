import { describe, expect } from '@jest/globals';
import { List } from "jinq";

describe('List', () => {
  describe('max()', () => {
    it('returns min of underlying array of numbers', () => {
      const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const result = list.max();
      return expect(result).toEqual(10);
    });
    it('returns undefined for an empty list', () => {
      const list = new List([]);
      const result = list.max();
      return expect(result).toEqual(undefined);
    });
  });
});
