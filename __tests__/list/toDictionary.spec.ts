import { describe, expect } from '@jest/globals';
import { List } from "jinq";

describe('list', () => {
  describe('toDictionary()', () => {
    it('converts a list to a dictionary', () => {
      const list = new List([
        {
          id: '12345',
          name: 'Jack',
          age: 22,
          favoriteColor: 'blue',
        },
        { id: '45678', name: 'Jill', age: 20, favoriteColor: 'green' },
        { id: 'abcd', name: 'Bob', age: 55, favoriteColor: 'blue' },
      ]);

      const result = list
        .toDictionary(
          (x) => x.id,
          (x) => x,
        )
        .toJSON();

      expect(result).toEqual({
        '12345': {
          id: '12345',
          name: 'Jack',
          age: 22,
          favoriteColor: 'blue',
        },
        '45678': { id: '45678', name: 'Jill', age: 20, favoriteColor: 'green' },
        abcd: { id: 'abcd', name: 'Bob', age: 55, favoriteColor: 'blue' },
      });
    });
    it('converts a list to a dictionary with value projection', () => {
      const list = new List([
        {
          id: '12345',
          name: 'Jack',
          age: 22,
          favoriteColor: 'blue',
        },
        { id: '45678', name: 'Jill', age: 20, favoriteColor: 'green' },
        { id: 'abcd', name: 'Bob', age: 55, favoriteColor: 'blue' },
      ]);

      const result1 = list
        .toDictionary(
          (x) => x.id,
          (x) => x.name,
        )
        .toJSON();

      expect(result1).toEqual({
        '12345': 'Jack',
        '45678': 'Jill',
        abcd: 'Bob',
      });

      const result2 = list
        .toDictionary(
          (x) => x.id,
          (x) => {
            return {
              name: x.name,
              age: x.age,
            };
          },
        )
        .toJSON();

      expect(result2).toEqual({
        '12345': { name: 'Jack', age: 22 },
        '45678': { name: 'Jill', age: 20 },
        abcd: { name: 'Bob', age: 55 },
      });
    });
  });
});
