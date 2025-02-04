import { describe, expect } from '@jest/globals';
import { List } from "jinq";

describe('List', () => {
  describe('count()', () => {
    it('returns length of underlying array with default invocation', () => {
      const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const result = list.count();
      return expect(result).toEqual(10);
    });
    it('returns 0 for an empty list', () => {
      const list = new List([]);
      const result = list.count();
      return expect(result).toEqual(0);
    });
    it('matches the equivalent .where() chain with predicate invocation', () => {
      const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const a = list.count((x) => x > 5);
      const b = list.where((x) => x > 5).count();
      return expect(a).toEqual(b);
    });
    it('accepts a predicate which filters an underlying array of numbers', () => {
      const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const result = list.count((x) => x > 5);
      return expect(result).toEqual(5);
    });
    it('accepts a predicate which filters an underlying array of json objects', () => {
      const list = new List([
        {
          name: 'John Smith',
          value: 1,
        },
        {
          name: 'Susy Q.',
          value: 2,
        },
        {
          name: 'Alpha',
          value: 3,
        },
      ]);
      const result = list.count((x) => x.value > 2);
      expect(result).toBe(1);
    });
    it('returns zero when jinq contains no matching items', () => {
      const list = new List([
        {
          name: 'John Smith',
          value: 1,
        },
        {
          name: 'Susy Q.',
          value: 2,
        },
        {
          name: 'Alpha',
          value: 3,
        },
      ]);
      const result = list.count((x) => x.value > 5);
      expect(result).toBe(0);
    });
    it('returns length of the underlying array with a forced truthy predicate', () => {
      const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const result = list.count(() => true);
      return expect(result).toEqual(10);
    });
    it('returns zero with a forced falsey predicate', () => {
      const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const result = list.count(() => false);
      return expect(result).toEqual(0);
    });
    it('chains with .select() statement', () => {
      const list = new List([
        {
          name: 'John Smith',
          value: 1,
        },
        {
          name: 'Susy Q.',
          value: 2,
        },
        {
          name: 'Alpha',
          value: 3,
        },
      ]);
      const result = list.select((x) => x.value).count((x) => x >= 2);
      expect(result).toBe(2);
    });
  });
});
