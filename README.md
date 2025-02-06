# jinq

A LINQ inspired package which extends and/or enhances native javascript data structures.

## Example
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
const count = list.count(item => item.age >= 33);

console.log(averageAge, minAge, maxAge, count); // prints 31 20 45 2
```

## Sorting

### Example (Array of Numbers)
```ts
import { List } from "jinq";

const list = new List([10, 3, 6, 8]);

const ascending = list
  .orderBy()
  .toJSON();

const descending = list
  .orderByDescending()
  .toJSON();

console.log(ascending); // prints 3 6 8 10
console.log(descending); // prints 10 8 6 3
```

### Example (Array of Objects)
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
  .toJSON();

console.log(sorted);
```

## Grouping
```ts
import { List } from "jinq";

const list = new List([
  { firstName: 'John', lastName: 'Smith', favoriteColor: 'blue', age: 20 },
  { firstName: 'Susy', lastName: 'Q', favoriteColor: 'green', age: 45 },
  { firstName: 'Jane', lastName: 'Doe', favoriteColor: 'blue', age: 33 },
]);

const grouped = list
  .groupBy(item => item.favoriteColor)
  .toJSON();

console.log(grouped);
/**
 * {
 *    blue: [
 *      { firstName: 'John', lastName: 'Smith', favoriteColor: 'blue', age: 20 },
 *      { firstName: 'Jane', lastName: 'Doe', favoriteColor: 'blue', age: 33 },
 *    ],
 *    green: [
 *      { firstName: 'Susy', lastName: 'Q', favoriteColor: 'green', age: 45 },
 *    ]
 * }
 */
```