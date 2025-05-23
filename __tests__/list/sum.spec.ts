import { describe, expect } from '@jest/globals';
import { List } from "@mcarbaugh/jinq";

describe('List', () => {
  describe('sum()', () => {
    it('returns sum of underlying array of numbers', () => {
      const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const result = list.sum();
      return expect(result).toEqual(55);
    });
    it('returns undefined for an empty list', () => {
      const list = new List([]);
      const result = list.sum();
      return expect(result).toEqual(undefined);
    });
  });
});
