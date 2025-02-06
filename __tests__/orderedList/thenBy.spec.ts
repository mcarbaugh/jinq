import { describe, expect } from '@jest/globals';
import { OrderedList } from "jinq";

describe('jinq', () => {
  describe('orderedList', () => {
    describe('constructor', () => {
      it('throws an error if constructed without a comparator', () => {
        let threw = false;
        try {
          const list = new OrderedList([], undefined);
        } catch (error) {
          threw = true;
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty('message', 'A comparator is required to construct an OrderedList.');
        }
        expect(threw).toEqual(true);
      });
  })
  })
});

