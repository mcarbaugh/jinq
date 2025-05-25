import { describe, expect } from '@jest/globals';
import { isNumeric } from '@mcarbaugh/jinq';

const Blah = class TestClass {};

describe('isNumeric', () => {
  it('returns true for positive numbers', () => {
    const result = isNumeric(100);
    return expect(result).toEqual(true);
  });
  it('returns true for negative numbers', () => {
    const result = isNumeric(-100);
    return expect(result).toEqual(true);
  });
  it('returns true for decimal numbers', () => {
    const result = isNumeric(45.36);
    return expect(result).toEqual(true);
  });
  it('returns true for zero', () => {
    const result = isNumeric(0);
    return expect(result).toEqual(true);
  });
  it('returns true for bigint', () => {
    const result = isNumeric(7n);
    return expect(result).toEqual(true);
  });
  it('returns false for NaN', () => {
    const result = isNumeric(NaN);
    return expect(result).toEqual(false);
  });
  it('returns false for numeric strings', () => {
    const result = isNumeric('100');
    return expect(result).toEqual(false);
  });
  it('returns false for null', () => {
    const result = isNumeric(null);
    return expect(result).toEqual(false);
  });
  it('returns false for undefined', () => {
    const result = isNumeric(undefined);
    return expect(result).toEqual(false);
  });
  it('returns false for whitespace strings', () => {
    const result = isNumeric(' ');
    return expect(result).toEqual(false);
  });
  it('returns false for Infinity', () => {
    const result = isNumeric(Infinity);
    return expect(result).toEqual(false);
  });
  it('returns false for functions', () => {
    const doSomething = () => {
      return;
    };
    const result = isNumeric(doSomething);
    return expect(result).toEqual(false);
  });
  it('returns false for json objects', () => {
    const something = {};
    const result = isNumeric(something);
    return expect(result).toEqual(false);
  });
  it('returns false for arrays', () => {
    const result = isNumeric([]);
    return expect(result).toEqual(false);
  });
  it('returns false for class definitions and instances', () => {
    const result1 = isNumeric(Blah);
    const result2 = isNumeric(new Blah());
    expect(result1).toEqual(false);
    expect(result2).toEqual(false);
  });
});
