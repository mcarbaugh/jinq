import { describe, expect } from '@jest/globals';
import { List } from "@mcarbaugh/jinq";

describe('orderedList', () => {
  describe('.toDictionary()', () => {
    it('throws an exception if lambdaKey is not specified', () => {
      let threw = false;
      try {
        const dictionary = new List([
          { favoriteColor: 'green', firstName: 'Joe', lastName: 'Bob' }
        ])
        .orderBy(x => x.lastName)
        .toDictionary();
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'lambdaKey is a required parameter.');
      }
      expect(threw).toEqual(true);
    })
    it('throws an exception if lambdaValue is not specified', () => {
      let threw = false;
      try {
        const dictionary = new List([
          { favoriteColor: 'green', firstName: 'Joe', lastName: 'Bob' }
        ])
        .orderBy(x => x.lastName)
        .toDictionary(x => x.favoriteColor);
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'lambdaValue is a required parameter.');
      }
      expect(threw).toEqual(true);
    })
    it('throws an exception if a duplicate key is detected', () => {
      let threw = false;
      try {
        const dictionary = new List([
          { favoriteColor: 'green', firstName: 'Joe', lastName: 'Bob' },
          { favoriteColor: 'green', firstName: 'Sarah', lastName: 'Jones' }
        ])
        .orderBy(x => x.lastName)
        .toDictionary( x => x.favoriteColor, x => x);
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', `Duplicate key green detected.`);
      }
      expect(threw).toEqual(true);
    })
  });
});
