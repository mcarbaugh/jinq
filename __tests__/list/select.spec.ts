import { describe, expect } from '@jest/globals';
import { List } from "@mcarbaugh/jinq";

describe('List', () => {
  describe('.select()', () => {
    it('returns a projection of the original sequence', () => {
      const list = new List([
        { favoriteColor: 'green', firstName: 'Joe', lastName: 'Bob' },
        { favoriteColor: 'green', firstName: 'Sarah', lastName: 'Jones' }
      ]);
      const result = list.select(item => {
        return {
          a: item.favoriteColor,
          b: item.lastName
        };
      });
      return expect(result).toEqual(new List([
        { a: 'green', b: 'Bob' },
        { a: 'green', b: 'Jones' }
      ]));
    });
  });
});
