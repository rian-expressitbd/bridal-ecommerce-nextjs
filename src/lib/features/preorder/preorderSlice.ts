import { Product } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreorderState {
  product: Product | null;
}

const initialState: PreorderState = {
  product: null,
};

const preorderSlice = createSlice({
  name: "preorder",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
});

export const { setProduct, clearProduct } = preorderSlice.actions;
export default preorderSlice.reducer;
