import { configureStore } from "@reduxjs/toolkit"
import positionReducer from "./positionSlice"

const store = configureStore({
    reducer: positionReducer,
})

export default store;