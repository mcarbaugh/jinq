import { describe, expect } from '@jest/globals';
import { List } from "@mcarbaugh/jinq";

describe('list', () => {
  describe('.toDictionary()', () => {
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
    it('throws an exception if keySelector is not specified', () => {
      let threw = false;
      try {
        const list = new List([
          { favoriteColor: 'green', firstName: 'Joe', lastName: 'Bob' }
        ]);
        list.toDictionary();
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'keySelector is a required parameter.');
      }
      expect(threw).toEqual(true);
    })
    it('throws an exception if valueSelector is not specified', () => {
      let threw = false;
      try {
        const list = new List([
          { favoriteColor: 'green', firstName: 'Joe', lastName: 'Bob' }
        ]);
        list.toDictionary( x => x.favoriteColor);
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'valueSelector is a required parameter.');
      }
      expect(threw).toEqual(true);
    })
    it('throws an exception if a duplicate key is detected', () => {
      let threw = false;
      try {
        const list = new List([
          { favoriteColor: 'green', firstName: 'Joe', lastName: 'Bob' },
          { favoriteColor: 'green', firstName: 'Sarah', lastName: 'Jones' }
        ]);
        list.toDictionary( x => x.favoriteColor, x => x);
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', `Key green has already been added.`);
      }
      expect(threw).toEqual(true);
    })
  });
});
