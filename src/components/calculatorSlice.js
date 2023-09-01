import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  incomingValue: "0",
  val1: null,
  val2: null,
  operator: null,
  calcul: "0",
  result: "",
}

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    addValue: (state, action) => {
      state.incomingValue = action.payload
    },
    coma: (state, action) => {
      state.incomingValue =
        state.incomingValue === "0" ? "0." : state.incomingValue + "."
    },
    deleteAction: (state, action) => {
      state.incomingValue =
        state.val1 === null && state.incomingValue.length === 1
          ? "0"
          : state.incomingValue.slice(0, -1)
    },
    clear: (state, action) => {
      state.val1 = null
      state.val2 = null
      state.operator = null
      state.previousValue = null
      state.result = ""
      state.calcul = "0"
      state.incomingValue = "0"
    },
    operations: (state, action) => {
      if (state.operator === null && state.val1 === null) {
        state.val1 = state.incomingValue
        state.calcul = state.val1 !== null ? state.val1 + " " : ""
        state.incomingValue = ""
      }

      state.operator = action.payload

      state.calcul += state.operator !== null ? state.operator + " " : ""
    },
    pourcentage: (state, action) => {
      if (state.val1 === null) {
        state.val1 = state.incomingValue / 100
        state.calcul = state.incomingValue + "% "
        state.incomingValue = ""
      } else {
        state.val2 = state.incomingValue / 100
        state.calcul += state.incomingValue + "% "
        state.incomingValue = ""
      }
    },
    square: (state, action) => {
      if (state.operator === null && state.val1 === null) {
        state.val1 = state.incomingValue * state.incomingValue
        state.calcul = state.incomingValue + "² "
        state.incomingValue = ""
      } else {
        state.val2 = state.incomingValue * state.incomingValue
        state.calcul += state.incomingValue + "² "
        state.incomingValue = ""
      }
    },
    calculResult: (state) => {
      if (state.operator !== null && state.val1 !== null) {
        if (state.val2 === null) {
          state.val2 = state.incomingValue
          state.calcul += state.val2 !== null ? state.val2 + " " : ""
          state.incomingValue = ""
        }
      }

      state.calcul += "="
      const val1 = parseFloat(state.val1)
      const val2 = parseFloat(state.val2)

      if (state.val2 === null) {
        state.result = state.val1
      } else {
        switch (state.operator) {
          case "+":
            state.result = (val1 + val2).toString()
            break
          case "-":
            state.result = (val1 - val2).toString()
            break
          case "*":
            state.result = (val1 * val2).toString()
            break
          case "/":
            state.result = (val1 / val2).toString()
            break
          default:
            break
        }
      }
    },
  },
})

export const {
  addValue,
  coma,
  deleteAction,
  clear,
  operations,
  calculResult,
  pourcentage,
  square,
} = calculatorSlice.actions

export default calculatorSlice.reducer
