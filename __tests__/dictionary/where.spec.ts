import { describe, expect } from '@jest/globals';
import { List } from "@mcarbaugh/jinq";

describe('dictionary', () => {
  describe('.where()', () => {
    it('filter items in the sequence based on a predicate', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
      ]);
      
      const result = list
        .toDictionary(x => x.age, x => x)
        .where(x => x.key > 30)
        .toJSON();

      return expect(result).toEqual({
        ['44']: { firstName: 'John', lastName: 'Smith', age: 44 }
      });
    });
    it('throws on null keys', () => {
      let threw = false;
      try {
        const list = new List([
          { firstName: 'John', lastName: 'Smith', age: 44 },
          { firstName: 'Susy', lastName: 'Q', age: 25 },
          { firstName: 'Jane', lastName: 'Doe', age: 30 },
          { firstName: 'Bobby', lastName: 'Baloo', age: null },
        ]);
        
        const result = list
        .toDictionary(x => x.age, x => x)
        .where(x => x.key > 30)
        .toJSON();

      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'key cannot be null.');
      }
      expect(threw).toEqual(true);
    });
  });
});
