import React from "react"
import "./Calculator.css"
import { useDispatch, useSelector } from "react-redux"
import {
  addValue,
  clear,
  operations,
  calculResult,
  pourcentage,
  square,
  deleteAction,
  coma,
} from "./calculatorSlice"

const Calculator = () => {
  const dispatch = useDispatch()

  const result = useSelector((state) => state.calculator.result)
  const incomingValue = useSelector((state) => state.calculator.incomingValue)
  const calcul = useSelector((state) => state.calculator.calcul)
  const operators = ["+", "-", "*", "/"]
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  const handleNumberClick = (number) => {
    dispatch(addValue(incomingValue === "0" ? number : incomingValue + number))
  }

  const handleOperations = (operation) => {
    dispatch(operations(operation))
  }

  const numberButtons = numbers.map((value, index) => (
    <button
      className="button button-numbers"
      key={index}
      disabled={result !== "" ? true : false}
      onClick={() => handleNumberClick(value)}
    >
      {value}
    </button>
  ))

  const operatorButtons = operators.map((operator, index) => (
    <button
      className="button button-operation"
      key={index}
      disabled={result !== "" ? true : false}
      onClick={() => handleOperations(operator)}
    >
      {operator}
    </button>
  ))

  const clearButton = () => {
    return (
      <button
        className="button button-cancel"
        onClick={() => dispatch(clear())}
      >
        CL
      </button>
    )
  }
  const egalButton = () => {
    return (
      <button
        className="button button-operation"
        disabled={result !== "" ? true : false}
        onClick={() => dispatch(calculResult())}
      >
        =
      </button>
    )
  }
  const pourcentageButton = () => {
    return (
      <button
        className="button button-operation"
        disabled={result !== "" ? true : false}
        onClick={() => dispatch(pourcentage())}
      >
        %
      </button>
    )
  }
  const comaButton = () => {
    return (
      <button
        className="button button-numbers"
        disabled={result !== "" ? true : false}
        onClick={() => dispatch(coma())}
      >
        ,
      </button>
    )
  }
  const deleteButton = () => {
    return (
      <button
        className="button button-operation"
        disabled={result !== "" ? true : false}
        onClick={() => dispatch(deleteAction())}
      >
        C
      </button>
    )
  }
  const squareButton = () => {
    return (
      <button
        className="button button-operation"
        disabled={result !== "" ? true : false}
        onClick={() => dispatch(square())}
      >
        x²
      </button>
    )
  }

  const line1 = [clearButton(), numberButtons[0], comaButton(), egalButton()]
  const line2 = [
    numberButtons[1],
    numberButtons[2],
    numberButtons[3],
    operatorButtons[0],
  ]
  const line3 = [
    numberButtons[4],
    numberButtons[5],
    numberButtons[6],
    operatorButtons[1],
  ]
  const line4 = [
    numberButtons[7],
    numberButtons[8],
    numberButtons[9],
    operatorButtons[2],
  ]
  const line5 = [
    pourcentageButton(),
    squareButton(),
    deleteButton(),
    operatorButtons[3],
  ]

  return (
    <div className="calculator">
      <div className="displayResult">
        {calcul === "0" ? (
          <p className="displayResult-calcul"> {incomingValue}</p>
        ) : calcul.length > 0 ? (
          <p className="displayResult-calcul">{`${calcul}${incomingValue}`}</p>
        ) : null}
        {result === "" ? (
          <br />
        ) : (
          <p className="displayResult-result">{result}</p>
        )}
      </div>
      <div className="buttons">
        {line5}
        {line4}
        {line3}
        {line2}
        {line1}
      </div>
    </div>
  )
}

export default Calculator
