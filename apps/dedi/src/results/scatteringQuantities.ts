import { Unit, divide, multiply } from "mathjs";

// Q is the scattering vector https://en.wikipedia.org/wiki/Small-angle_scattering
// here it is the range

// S is the inverse of Q
export const convertFromQToS = (quantity: Unit): Unit => {
  const result = divide(1, quantity);
  if (typeof result == "number" || !("units" in result)) {
    throw TypeError("name this error later ");
  }
  return result;
};

// D is this specific transformation
export const convertFromQtoD = (quantity: Unit): Unit => {
  const result = divide(2 * Math.PI, quantity);
  if (typeof result == "number" || !("units" in result)) {
    throw TypeError("name this error later ");
  }
  return result;
};

export const convertFromDTooS = (quantity: Unit): Unit => {
  const result = divide(quantity, 2 * Math.PI);
  if (typeof result == "number" || !("units" in result)) {
    throw TypeError("");
  }
  return result;
};

export const convertFromStooD = (quantity: Unit): Unit => {
  const result = multiply(quantity, 2 * Math.PI);
  if (typeof result == "number" || !("units" in result)) {
    throw TypeError("");
  }
  return result;
};
