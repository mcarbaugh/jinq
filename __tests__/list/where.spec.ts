import { describe, expect } from '@jest/globals';
import { List } from "@mcarbaugh/jinq";

describe('list', () => {
  describe('.where()', () => {
    it('filter items in the sequence based on a predicate', () => {
      const list = new List([
        { firstName: 'John', lastName: 'Smith', age: 44 },
        { firstName: 'Susy', lastName: 'Q', age: 25 },
        { firstName: 'Jane', lastName: 'Doe', age: 30 },
        { firstName: 'Bert', lastName: 'Reynolds', age: null },
      ]);
      const result = list.where(x => x.age > 30).toJSON();
      return expect(result).toEqual([
        { firstName: 'John', lastName: 'Smith', age: 44 },
      ]);
    });
    // it('throws an error when non numeric, non null values appear in the source sequence', () => {
    //   let threw = false;
    //   try {
    //     const list = new List([1, 2, 3, '4', 'abc', null, 7, 8, 9]);
    //     list.average();
    //   } catch (error) {
    //     threw = true;
    //     expect(error).toBeInstanceOf(Error);
    //     expect(error).toHaveProperty('message', 'type not supported.');
    //   }
    //   expect(threw).toEqual(true);
    // });
  });
});
