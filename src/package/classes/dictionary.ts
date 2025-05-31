import { KeyValuePair, Lambda, ValueMap } from '../types';
import { ifThrow } from '../utilities/ifThrow';

export class Dictionary<TKey, TValue> {

  private readonly _source: ValueMap<KeyValuePair<string, TValue>>;

  constructor() {
    this._source = {};
  }

  public get(key: string) {
    ifThrow(this._source === null || this._source === undefined, 'source is null or undefined.');
    ifThrow(!this.contains(key), `Key ${key} not found.`);
    return this._source[key].value;
  }

  public set(key: string, value: TValue) {
    ifThrow(this._source === null || this._source === undefined, 'source is null or undefined.');
    ifThrow(this.contains(key), `Key ${key} has already been added.`);
    this._source[key] = new KeyValuePair(key, value);
  }

  public contains(key: string) {
    ifThrow(this._source === null || this._source === undefined, 'source is null or undefined.');
    return Object.prototype.hasOwnProperty.call(this._source, key);
  }

  public where(predicate: Lambda<KeyValuePair<string, TValue>, boolean>) {
    ifThrow(!predicate, 'predicate is required.');
    const filtered = new Dictionary<TKey, TValue>();
    Object.entries(this._source).forEach(entry => {
      const match = predicate(entry[1]);
      if (match) {
        filtered.set(entry[1].key, entry[1].value);
      }
    });
    return filtered;
  }
  
  public toJSON() {
    ifThrow(this._source === null || this._source === undefined, 'source is null or undefined.');
    return Object.fromEntries(
      Object.entries(this._source).map((entry) => [entry[1].key, entry[1].value])
    );
  }
}
