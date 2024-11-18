import * as math from "mathjs";
import { describe, it, beforeEach, afterAll, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Calculator } from "../../src/components/Calculator";
import userEvent from "@testing-library/user-event";
import React from "react";

const operators = ["/", "*", "-", "+"];
const equalSign = "=";
describe("calculator", () => {
  const user = userEvent.setup();
  beforeEach(() => {
    cleanup();
    render(<Calculator />);
  });

  it("should show title correctly", () => {
    const title = screen.getByText("Calculator");
  });

  it("should have all the numbers", () => {
    math.range(0, 10).forEach((number) => {
      screen.getByText(number.toString());
    });
  });

  it("should have all the operators", () => {
    operators.forEach((operator) => {
      screen.getByText(operator);
    });
  });

  it("should have an equal sign", () => {
    screen.getByText(equalSign);
  });

  it("should have an input text and a history, both read only", () => {
    const history = screen.getByRole("history");
    const input = screen.getByRole("input");
    expect(history.getAttribute("readonly")).toBe("");
    expect(input.getAttribute("readonly")).toBe("");
  });

  it("should have a clear button", () => {
    screen.getByText("C");
  });

  it("should have a backspace button", () => {
    screen.getByText("⌫");
  });

  it("should on click on a number, add it to the input", async () => {
    const nButton = screen.getByText("1");
    const input: HTMLInputElement = screen.getByRole("input");
    await user.click(nButton);
    expect(input.value).toBe("1");
  });

  it("should concatenate numbers", async () => {
    const input: HTMLInputElement = screen.getByRole("input");
    var number = -1;
    const order: number[] = [];
    for (let i = 0; i < 10; i++) {
      number = math.randomInt(1, 10);
      const nButton = screen.getByRole("button", {
        name: number.toString(),
      });
      await user.click(nButton);
      order.push(number);
    }
    expect(input.value).toBe(order.join(""));
  });

  it("should, after clicking an operator, add it to the history", async () => {
    const history: HTMLInputElement = screen.getByRole("history");
    const operator = operators[math.randomInt(0, operators.length - 1)];
    const number = math.randomInt(0, 10);
    const operatorButton = screen.getByText(operator);
    const nButton = screen.getByText(number.toString());
    await user.click(nButton);
    await user.click(operatorButton);
    expect(history.value).toBe(`${number} ${operator}`);
  });

  it("should, if clicking multiple operators, replace the last one with the new one", async () => {
    const history: HTMLInputElement = screen.getByRole("history");
    const operator = operators[0];
    const operator2 = operators[1];
    const number = math.randomInt(0, 10);
    const operatorButton = screen.getByText(operator);
    const operator2Button = screen.getByText(operator2);
    const nButton = screen.getByText(number.toString());
    await user.click(nButton);
    await user.click(operatorButton);
    await user.click(operator2Button);
    expect(history.value).toBe(`${number} ${operator2}`);
  });

  it("should, clicking a number after an operator starts the input with a new number", async () => {
    const input: HTMLInputElement = screen.getByRole("input");
    const nButton = screen.getByText("1");
    const nButton2 = screen.getByText("2");
    const operator = operators[math.randomInt(0, operators.length - 1)];
    const operatorButton = screen.getByText(operator);
    await user.click(nButton);
    await user.click(operatorButton);
    await user.click(nButton2);
    expect(input.value).toBe("2");
  });

  it("Clicking a number, operator, number, and operator should calculate the result, add it to history, and show the new operator", async () => {
    const input: HTMLInputElement = screen.getByRole("input");
    const history: HTMLInputElement = screen.getByRole("history");
    const nButton = screen.getByText("1");
    const nButton2 = screen.getByText("2");
    const operatorButton = screen.getByText("+");
    await user.click(nButton);
    await user.click(operatorButton);
    await user.click(nButton2);
    await user.click(operatorButton);
    await user.click(nButton);
    expect(input.value).toBe("1");
    expect(history.value).toBe("3 +");
  });
  const equalTest = async () => {
    const input: HTMLInputElement = screen.getByRole("input");
    const history: HTMLInputElement = screen.getByRole("history");
    const number1 = math.randomInt(0, 10);
    const number2 = math.randomInt(0, 10);
    const nButton = screen.getByText(number1);
    const nButton2 = screen.getByText(number2);
    const operator = operators[math.randomInt(0, operators.length - 1)];
    const operatorButton = screen.getByText(operator);
    const equalButton = screen.getByText(equalSign);
    const result = math.evaluate(`${number1} ${operator} ${number2}`);
    await user.click(nButton);
    await user.click(operatorButton);
    await user.click(nButton2);
    await user.click(equalButton);
    expect(input.value).toBe(result.toString());
    expect(history.value).toBe(number1 + " " + operator + " " + number2 + " =");
  };
  it(
    "clicking the equal button should calculate the result, showing it in the input, and making the history the operation",
    equalTest
  );

  it("should start anew if after the equal button is clicked, a number is clicked", async () => {
    await equalTest();
    const input: HTMLInputElement = screen.getByRole("input");
    const history: HTMLInputElement = screen.getByRole("history");
    const number = math.randomInt(0, 10).toString();
    const nButton = screen.getByText(number);
    await user.click(nButton);
    expect(input.value).toBe(number);
    expect(history.value).toBe("");
  });

  it("should continue the operation if after the equal button is clicked, an operator is clicked", async () => {
    await equalTest();
    const input: HTMLInputElement = screen.getByRole("input");
    const history: HTMLInputElement = screen.getByRole("history");
    const operator = operators[math.randomInt(0, operators.length - 1)];
    const operatorButton = screen.getByText(operator);
    await user.click(operatorButton);
    expect(history.value).toBe(`${input.value} ${operator}`);
  });

  it("should clear everything if the clear button is clicked", async () => {
    const input: HTMLInputElement = screen.getByRole("input");
    const history: HTMLInputElement = screen.getByRole("history");
    const clearButton = screen.getByText("C");
    const number = math.randomInt(0, 10).toString();
    const operator = operators[math.randomInt(0, operators.length - 1)];
    const operatorButton = screen.getByText(operator);
    const nButton = screen.getByText(number);
    await user.click(nButton);
    await user.click(operatorButton);
    await user.click(clearButton);
    expect(input.value).toBe("0");
    expect(history.value).toBe("");
  });

  it("should remove the last character of the input if the backspace button is clicked", async () => {
    const input: HTMLInputElement = screen.getByRole("input");
    const history: HTMLInputElement = screen.getByRole("history");
    const backspaceButton = screen.getByText("⌫");
    const number = math.randomInt(0, 10).toString();
    const nButton = screen.getByText(number);
    await user.click(nButton);
    await user.click(backspaceButton);
    expect(input.value).toBe("0");
    await user.click(nButton);
    await user.click(nButton);
    await user.click(backspaceButton);
    expect(input.value).toBe(number);
  });

  it("should control divisions by 0", async () => {
    const input: HTMLInputElement = screen.getByRole("input");
    const history: HTMLInputElement = screen.getByRole("history");
    const number = math.randomInt(0, 10).toString();
    const zero = "0";
    const nButton = screen.getByText(number);
    const zeroButton = screen.getByText(zero);
    const operator = "/";
    const operatorButton = screen.getByText(operator);
    const equalButton = screen.getByText(equalSign);
    await user.click(nButton);
    await user.click(operatorButton);
    await user.click(zeroButton);
    await user.click(equalButton);
    expect(input.value).toBe("Can't divide by zero");
    expect(history.value).toBe("");
    await user.click(nButton);
    await user.click(operatorButton);
    await user.click(zeroButton);
    await user.click(operatorButton);
    expect(input.value).toBe("Can't divide by zero");
    expect(history.value).toBe("");
  });
});
