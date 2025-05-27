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
  return isBigInt(value)
    ? Number(value)
    : isNumeric(value)
      ? value as number
      : ifThrow(value !== null, 'type not supported.')
        ? null
        : null;
}