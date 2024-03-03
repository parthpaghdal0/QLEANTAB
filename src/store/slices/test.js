import { createSlice } from "@reduxjs/toolkit"

const testSlice = createSlice({
  name: "test",
  initialState: {
    val: "",
  },
  reducers: {
    setTest(state, action) {
      state.val = action.payload
    },
  },
})

export default testSlice
