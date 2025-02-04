import { List } from "jinq";

describe('Dictionary', () => {
  describe('get()', () => {
    it('throws an error if a key does not exist', () => {
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
      const dictionary = list.toDictionary(
        (x) => x.id,
        (x) => x,
      );

      let threw = false;
      try {
        dictionary.get('11111');
      } catch (error) {
        threw = true;
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', `Key ${11111} not found.`);
      }
      expect(threw).toEqual(true);
    });
  });
});
