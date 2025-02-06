import { describe, expect } from '@jest/globals';
import { List } from "jinq";

describe('jinq', () => {
  describe('thenBy()', () => {
    it('creates and returns a new jinq instance', () => {
      const source = [
        { firstName: 'John', lastName: 'Smith', favoriteColor: 'blue' },
        { firstName: 'Susy', lastName: 'Q', favoriteColor: 'green' },
        { firstName: 'Jane', lastName: 'Doe', favoriteColor: 'blue' },
      ];
      
      const a = new List(source).orderBy(x => x.lastName);
      const b = a.thenBy((x) => x.firstName);
      return expect(a).not.toBe(b);
    });
    it('sorts by an additional field when invoked after .orderBy()', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', favoriteColor: 'blue' },
        { firstName: 'Susy', lastName: 'Q', favoriteColor: 'green' },
        { firstName: 'Jane', lastName: 'Doe', favoriteColor: 'blue' },
      ]);

      const result = list
        .orderBy(x => x.favoriteColor)
        .thenBy(x => x.lastName)
        .toJSON();
      
      expect(result).toEqual([
        { firstName: 'Jane', lastName: 'Doe', favoriteColor: 'blue' },
        { firstName: 'John', lastName: 'Smith', favoriteColor: 'blue' },
        { firstName: 'Susy', lastName: 'Q', favoriteColor: 'green' },
      ]);
    });
  });
});
