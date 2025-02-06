
export class Enumerable<T> {
  constructor(
    protected collection: Array<T>,
  ) {
    this.collection = collection;
  }

  public toJSON() {
    return this.collection;
  }
}