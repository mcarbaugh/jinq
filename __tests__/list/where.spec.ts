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
  });
});
