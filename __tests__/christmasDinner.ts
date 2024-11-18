import { christmasDinner } from "../functions/christmasDinner";

describe("organizeChristmasDinner", () => {
  it("should return an empty array if no dishes are provided", () => {
    expect(christmasDinner([])).toEqual([]);
  });

  it("should return an empty array if no ingredients are shared between dishes", () => {
    const dishes = [
      ["christmas turkey", "turkey", "herbs"],
      ["cake", "flour", "sugar"],
      ["hot chocolate", "chocolate", "milk"],
      ["pizza", "tomato", "cheese", "ham"],
    ];
    expect(christmasDinner(dishes)).toEqual([]);
  });

  it("should group dishes by common ingredients", () => {
    const dishes = [
      ["christmas turkey", "turkey", "sauce", "herbs"],
      ["cake", "flour", "sugar", "egg"],
      ["hot chocolate", "chocolate", "milk", "sugar"],
      ["pizza", "sauce", "tomato", "cheese", "ham"],
    ];
    expect(christmasDinner(dishes)).toEqual([
      ["sauce", "christmas turkey", "pizza"],
      ["sugar", "cake", "hot chocolate"],
    ]);
  });

  it("should sort the ingredients alphabetically", () => {
    const dishes = [
      ["christmas turkey", "turkey", "sauce", "herbs"],
      ["cake", "flour", "sugar", "egg"],
      ["hot chocolate", "chocolate", "milk", "sugar"],
      ["pizza", "sauce", "tomato", "cheese", "ham"],
    ];
    const result = christmasDinner(dishes);
    expect(result[0][0]).toBe("sauce");
    expect(result[1][0]).toBe("sugar");
  });

  it("should sort the dishes alphabetically within each ingredient group", () => {
    const dishes = [
      ["christmas turkey", "turkey", "sauce", "herbs"],
      ["cake", "flour", "sugar", "egg"],
      ["hot chocolate", "chocolate", "milk", "sugar"],
      ["pizza", "sauce", "tomato", "cheese", "ham"],
    ];
    const result = christmasDinner(dishes);
    expect(result[0]).toEqual(["sauce", "christmas turkey", "pizza"]);
    expect(result[1]).toEqual(["sugar", "cake", "hot chocolate"]);
  });

  it("should handle ingredients that appear in more than two dishes", () => {
    const dishes = [
      ["christmas turkey", "turkey", "sauce", "herbs"],
      ["cake", "flour", "sugar", "egg"],
      ["hot chocolate", "chocolate", "milk", "sugar"],
      ["pizza", "sauce", "tomato", "cheese", "ham"],
      ["salad", "lettuce", "tomato", "cheese"],
    ];
    const result = christmasDinner(dishes);
    expect(result).toEqual([
      ["cheese", "pizza", "salad"],
      ["sauce", "christmas turkey", "pizza"],
      ["sugar", "cake", "hot chocolate"],
      ["tomato", "pizza", "salad"],
    ]);
  });

  it("should handle dishes with ingredients that are unique to each dish", () => {
    const dishes = [
      ["christmas turkey", "turkey", "herbs"],
      ["cake", "flour", "sugar"],
      ["hot chocolate", "chocolate", "milk"],
      ["pizza", "tomato", "cheese", "ham"],
    ];
    const result = christmasDinner(dishes);
    expect(result).toEqual([]);
  });
});
