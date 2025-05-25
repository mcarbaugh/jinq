import { describe, expect } from '@jest/globals';
import { List } from "@mcarbaugh/jinq";

describe('List', () => {
  describe('.select()', () => {
    it('throws an error when invoked without a parameter', () => {
      let threw = false;
      try {
        const list = new List([]);
        list.select();
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'selector is required.');
      }
      expect(threw).toEqual(true);
    });
    it('throws an error when invoked with a null parameter', () => {
      let threw = false;
      try {
        const list = new List([]);
        list.select(null);
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'selector is required.');
      }
      expect(threw).toEqual(true);
    });
    it('throws an error when invoked with an undefined parameter', () => {
      let threw = false;
      try {
        const list = new List([]);
        list.select(undefined);
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'selector is required.');
      }
      expect(threw).toEqual(true);
    });
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
    it('returns a sequence of strings from a list of objects', () => {
      const list = new List([
        { favoriteColor: 'green', firstName: 'Joe', lastName: 'Bob' },
        { favoriteColor: 'green', firstName: 'Sarah', lastName: 'Jones' }
      ]);
      const result = list.select(item => item.lastName);
      return expect(result).toEqual(new List(['Bob', 'Jones']));
    });
    it('returns a sequence of numbers from a list of objects', () => {
      const list = new List([
        { favoriteColor: 'green', firstName: 'Joe', lastName: 'Bob', age: 22 },
        { favoriteColor: 'green', firstName: 'Sarah', lastName: 'Jones', age: 45 }
      ]);
      const result = list.select(item => item.age);
      return expect(result).toEqual(new List([22, 45]));
    });
  });
});
