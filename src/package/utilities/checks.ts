import { ifThrow } from "./ifThrow";

export const isNumeric = (value: any) => {
  return !(typeof(value) === "string"
    || typeof(value) === "boolean"
    || typeof(value) === "object"
    || typeof(value) === "function"
    || typeof(value) === "symbol"
    || (typeof(value) === "bigint" ? isNaN(Number(value)) : isNaN(value))
    || value === Infinity
    || value === null
    || value === undefined
  ) && (typeof(value) === "number" || typeof(value) === "bigint")
}

export const isBigInt = (value: any) => {
  return isNumeric(value) && typeof(value) === "bigint";
}

export const checkedNumber = (value: any): number | null => {
  if (isBigInt(value)) {
    return Number(value);
  } else if (isNumeric(value)) {
    return value as number;
  } else {
    ifThrow(value !== null, 'type not supported.')
    return null;
  }
}