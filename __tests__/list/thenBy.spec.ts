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
      
      const a = new List(source);
      const b = a
        .orderBy(x => x.lastName)
        .thenBy((x) => x.firstName);

      return expect(a).not.toBe(b);
    });
    it('throws an error if called in isolation w/o a preceding orderBy()', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', favoriteColor: 'blue' },
        { firstName: 'Susy', lastName: 'Q', favoriteColor: 'green' },
        { firstName: 'Jane', lastName: 'Doe', favoriteColor: 'blue' },
      ]);

      let threw = false;
      try {
        list.thenBy(x => x.favoriteColor);
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'Unable to resolve symbol thenBy.');
      }
      expect(threw).toEqual(true);
    });
  });
});
