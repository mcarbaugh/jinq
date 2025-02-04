import { KeyValuePair } from '../types';
import { ifThrow } from '../utilities/ifThrow';

export class Dictionary<T> {
  constructor(private collection: KeyValuePair<T>) {
    this.collection = collection;
  }

  public get(key: string) {
    ifThrow(
      !Object.prototype.hasOwnProperty.call(this.collection, key),
      `Key ${key} not found.`,
    );
    return this.collection[key];
  }

  public set(key: string, value: T) {
    this.collection[key] = value;
  }

  public toJSON() {
    return this.collection;
  }
}
