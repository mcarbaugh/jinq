import { describe, expect } from '@jest/globals';
import { List } from "jinq";

describe('List', () => {
  describe('avg()', () => {
    it('returns min of underlying array of numbers', () => {
      const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const result = list.avg();
      return expect(result).toEqual(5.5);
    });
    it('returns undefined for an empty list', () => {
      const list = new List([]);
      const result = list.avg();
      return expect(result).toEqual(undefined);
    });
  });
});
