import { describe, expect } from '@jest/globals';
import { List, OrderedList } from "@mcarbaugh/jinq";

describe('list', () => {
  describe('.thenBy()', () => {
    it('returns a new OrderedList', () => {
      const source = [
        { firstName: 'John', lastName: 'Smith', favoriteColor: 'blue' },
        { firstName: 'Susy', lastName: 'Q', favoriteColor: 'green' },
        { firstName: 'Jane', lastName: 'Doe', favoriteColor: 'blue' },
      ];
      
      const result = new List(source)
        .orderBy(x => x.lastName)
        .thenBy((x) => x.firstName);

      expect(result).not.toBe(source);
      expect(result).toBeInstanceOf(OrderedList);
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
    it('creates and sorts a new array without modifying the source array', () => {
      const source = [
        { firstName: 'John', lastName: 'Smith', favoriteColor: 'blue' },
        { firstName: 'Susy', lastName: 'Q', favoriteColor: 'green' },
        { firstName: 'Jane', lastName: 'Doe', favoriteColor: 'blue' },
      ];
      
      const result = new List(source)
        .orderBy(x => x.lastName)
        .thenBy((x) => x.firstName)
        .toJSON();

      expect(source).not.toEqual(result);
      expect(source).not.toBe(result);
      expect(source).toEqual([
        { firstName: 'John', lastName: 'Smith', favoriteColor: 'blue' },
        { firstName: 'Susy', lastName: 'Q', favoriteColor: 'green' },
        { firstName: 'Jane', lastName: 'Doe', favoriteColor: 'blue' },
      ])
    });
    it('places null values before strings', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', favoriteColor: 'blue' },
        { firstName: 'Susy', lastName: null, favoriteColor: 'blue' },
        { firstName: 'Jane', lastName: 'Doe', favoriteColor: 'blue' },
      ]);
      const result = list
        .orderBy(x => x.favoriteColor)
        .thenBy(x => x.lastName)
        .toJSON();

      expect(result).toEqual([
        { firstName: 'Susy', lastName: null, favoriteColor: 'blue' },
        { firstName: 'Jane', lastName: 'Doe', favoriteColor: 'blue' },
        { firstName: 'John', lastName: 'Smith', favoriteColor: 'blue' },
      ]);
    });
  });
});
