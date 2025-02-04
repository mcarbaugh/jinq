/**
 * Throws an error if the condition is true.
 * @param condition
 * @param message
 */
export const ifThrow = (condition: boolean, message: string) => {
  if (condition) throw new Error(message);
  return true;
};
