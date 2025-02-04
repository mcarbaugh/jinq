import { describe, expect } from '@jest/globals';
import { List } from "jinq";

describe('jinq', () => {
  describe('orderByDescending()', () => {
    it('creates and returns a new jinq instance', () => {
      const source = [5, 10, 22, 23, 9, 6, 4];
      const a = new List(source);
      const b = a.orderByDescending((x) => x);
      return expect(a).not.toBe(b);
    });
    it('sorts the underlying array in descending order', () => {
      const source = [5, 10, 22, 23, 9, 6, 4];
      const a = new List(source);
      const b = a.orderByDescending((x) => x).toArray();
      return expect(b).toEqual([23, 22, 10, 9, 6, 5, 4]);
    });
  });
});
