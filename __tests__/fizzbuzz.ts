import { fizzbuzz } from "../functions/fizzbuzz";

describe("fizzbuzz excercise", () => {
  describe("FizzBuzz function", () => {
    test("should return 'Fizz' for numbers divisible by 3", () => {
      expect(fizzbuzz(3)).toBe("Fizz");
      expect(fizzbuzz(6)).toBe("Fizz");
      expect(fizzbuzz(9)).toBe("Fizz");
    });

    test("should return 'Buzz' for numbers divisible by 5", () => {
      expect(fizzbuzz(5)).toBe("Buzz");
      expect(fizzbuzz(10)).toBe("Buzz");
      expect(fizzbuzz(20)).toBe("Buzz");
    });

    test("should return 'FizzBuzz' for numbers divisible by both 3 and 5", () => {
      expect(fizzbuzz(15)).toBe("FizzBuzz");
      expect(fizzbuzz(30)).toBe("FizzBuzz");
      expect(fizzbuzz(45)).toBe("FizzBuzz");
    });

    test("should return the number itself for numbers not divisible by 3 or 5", () => {
      expect(fizzbuzz(1)).toBe("1");
      expect(fizzbuzz(2)).toBe("2");
      expect(fizzbuzz(7)).toBe("7");
      expect(fizzbuzz(8)).toBe("8");
    });

    test("should throw an error if the input is not a number", () => {
      expect(() => fizzbuzz("hello" as any)).toThrow("not a number");
      expect(() => fizzbuzz(undefined as any)).toThrow("not a number");
      expect(() => fizzbuzz(null as any)).toThrow("not a number");
      expect(() => fizzbuzz([] as any)).toThrow("not a number");
    });

    test("should return 'Fizz' for negative numbers divisible by 3", () => {
      expect(fizzbuzz(-3)).toBe("Fizz");
      expect(fizzbuzz(-6)).toBe("Fizz");
    });

    test("should return 'Buzz' for negative numbers divisible by 5", () => {
      expect(fizzbuzz(-5)).toBe("Buzz");
      expect(fizzbuzz(-10)).toBe("Buzz");
    });

    test("should return 'FizzBuzz' for negative numbers divisible by both 3 and 5", () => {
      expect(fizzbuzz(-15)).toBe("FizzBuzz");
      expect(fizzbuzz(-30)).toBe("FizzBuzz");
    });

    test("should return the number itself for negative numbers not divisible by 3 or 5", () => {
      expect(fizzbuzz(-1)).toBe("-1");
      expect(fizzbuzz(-7)).toBe("-7");
      expect(fizzbuzz(-8)).toBe("-8");
    });
  });
});
