# jinq

A LINQ inspired package which aims to extend and/or enhance native javascript data structures.

#### Example Usage:
```ts
import { List } from "jinq";

const list = new List([
  { firstName: 'John', lastName: 'Smith', favoriteColor: 'blue', age: 20 },
  { firstName: 'Susy', lastName: 'Q', favoriteColor: 'green', age: 45 },
  { firstName: 'Jane', lastName: 'Doe', favoriteColor: 'blue', age: 33 },
]);

const averageAge = list.average(item => item.age);
const minAge = list.min(item => item.age);
const maxAge = list.max(item => item.age);

console.log(averageAge, minAge, maxAge); // prints 31 20 45
```

### Sorting:

#### Simple:
```ts
import { List } from "jinq";

const list = new List([10, 3, 6, 8]);

const ascending = list
  .orderBy()
  .toArray();

const descending = list
  .orderByDescending()
  .toArray();

console.log(ascending); // prints 3 6 8 10
console.log(descending); // prints 10 8 6 3
```

#### Objects:
```ts
import { List } from "jinq";

const list = new List([
  { firstName: 'John', lastName: 'Smith', favoriteColor: 'blue', age: 20 },
  { firstName: 'Susy', lastName: 'Q', favoriteColor: 'green', age: 45 },
  { firstName: 'Jane', lastName: 'Doe', favoriteColor: 'blue', age: 33 },
]);

const sorted = list
  .orderBy(item => item.favoriteColor) // applies a primary sort on favoriteColor
  .thenBy(item => item.lastName) // applies a secondary sort on lastName
  .toArray();

console.log(sorted);
```