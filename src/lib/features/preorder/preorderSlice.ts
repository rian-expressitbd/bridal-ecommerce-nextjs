// src/lib/features/preorder/preorderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PreorderItem } from "@/hooks/usePreorder";

interface PreorderState {
  product: PreorderItem | null;
}

const initialState: PreorderState = {
  product: null,
};

const preorderSlice = createSlice({
  name: "preorder",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<PreorderItem>) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
});

export const { setProduct, clearProduct } = preorderSlice.actions;
export default preorderSlice.reducer;