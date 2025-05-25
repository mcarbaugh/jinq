import { describe, expect } from '@jest/globals';
import { List } from "@mcarbaugh/jinq";

describe('list', () => {
  describe('.append()', () => {
    it('throws on null item', () => {
      let threw = false;
      try {
        const list = new List([1, 2, 3, 4, 5]);
        const result = list.append(null);
        list.toDictionary( x => x.favoriteColor, x => x);
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', `item is null or undefined.`);
      }
      expect(threw).toEqual(true);
    });
    it('adds an item to the end of the source sequence', () => {
      const list = new List([1, 2, 3, 4, 5]);
      const result = list.append(6);
      expect(result).toEqual(new List([1, 2, 3, 4, 5, 6]));
      expect(list).not.toBe(result);
    });
  });
});
