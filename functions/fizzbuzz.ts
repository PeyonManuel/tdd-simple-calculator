export const fizzbuzz = (number: number) => {
  if (typeof number !== "number" || !Number.isFinite(number)) {
    throw new Error("not a number");
  }
  var returnString = "";
  if (number % 3 === 0) returnString += "Fizz";
  if (number % 5 === 0) returnString += "Buzz";
  return returnString === "" ? number.toString() : returnString;
};
