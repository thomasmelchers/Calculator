import { configureStore } from "@reduxjs/toolkit"
import calculatorReducer from "../components/calculatorSlice"

export const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
  },
})
