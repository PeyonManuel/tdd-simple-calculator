import React from "react";
import * as math from "mathjs";
export const Calculator = () => {
  const numberRows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];
  const operators = ["/", "*", "-", "+"];
  const equalSign = "=";
  const [inputValue, setInputValue] = React.useState("0");
  const [history, setHistory] = React.useState("");
  const [justClickedOperator, setJustClickedOperator] = React.useState(false);
  const onNumberClick = (number: number) => {
    setInputValue(
      justClickedOperator ||
        inputValue === "0" ||
        inputValue === "Can't divide by zero"
        ? number.toString()
        : inputValue + number.toString()
    );

    if (justClickedOperator && history[history.length - 1] === equalSign) {
      setHistory("");
    }

    setJustClickedOperator(false);
  };

  const divisionByZeroCheck = () => {
    if (history[history.length - 1] !== "/" || inputValue !== "0") return false;
    setHistory("");
    setInputValue("Can't divide by zero");
    return true;
  };
  const onOperatorClick = (operator: string) => {
    if (divisionByZeroCheck()) return;
    const updatedHistory =
      justClickedOperator || history === ""
        ? `${inputValue} ${operator}`
        : `${math.evaluate(`${history} ${inputValue}`)} ${operator}`;

    setHistory(updatedHistory);
    setJustClickedOperator(true);
  };

  const onEqualClick = () => {
    if (divisionByZeroCheck()) return;
    const result = math.evaluate(history + inputValue);
    setHistory((history) => history + " " + inputValue + " =");
    setInputValue(result.toString());
    setJustClickedOperator(true);
  };

  const reset = () => {
    setInputValue("0");
    setHistory("");
    setJustClickedOperator(false);
  };

  const onBackSpaceClick = () => {
    if (inputValue === "0") return;
    if (inputValue.length === 1) {
      setInputValue("0");
    } else {
      setInputValue(inputValue.slice(0, -1));
    }
  };

  return (
    <div>
      <h1>Calculator</h1>
      <input type="text" readOnly role="history" value={history} />
      <input type="text" readOnly role="input" value={inputValue} />
      <button onClick={() => reset()}>C</button>
      <button onClick={() => onBackSpaceClick()}>⌫</button>
      {numberRows.map((row) => (
        <div>
          {row.map((number) => (
            <button key={number} onClick={() => onNumberClick(number)}>
              {number}
            </button>
          ))}
        </div>
      ))}
      {operators.map((operator) => (
        <button key={operator} onClick={() => onOperatorClick(operator)}>
          {operator}
        </button>
      ))}
      <button onClick={() => onEqualClick()}>{equalSign}</button>
    </div>
  );
};
