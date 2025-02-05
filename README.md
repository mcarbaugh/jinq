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

#### Sorting:
```ts
const sorted = list
  .orderBy(item => item.favoriteColor) // applies a primary sort on favoriateColor
  .thenBy(item => item.lastName) // applies a secondary sort on lastName
  .toArray();

console.log(sorted);
```

#### Support Methods:
* orderBy
* orderByDescending
* thenBy
* thenByDescending
* where
* remove
* select
* count
* sum
* min
* max
* avg
* toArray

https://pauloe-me.medium.com/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c