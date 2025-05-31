export type ValueMap<TValue> = { [key: string]: TValue };

export class KeyValuePair<TKey, TValue> {
  private readonly _key: TKey;
  private readonly _value: TValue;

  constructor(key: TKey, value: TValue) {
      this._key = key;
      this._value = value;
  }

  get key(): TKey {
    return this._key;
  }

  get value(): TValue {
    return this._value;
  }
}