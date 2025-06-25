// src/hooks/usePreorder.ts
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { setProduct, clearProduct } from "@/lib/features/preorder/preorderSlice";

export interface PreorderItem {
  productId: string;
  name: string;
  quantity: number;
  isPreOrder: boolean;
  price: number; // Ensure this is always number
  variantId?: string | null;
  variantName?: string | null;
  image?: string;
}

export const usePreorder = () => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.preorder.product);

  const setPreorderProduct = (item: Omit<PreorderItem, 'isPreOrder'> & { isPreOrder?: boolean }) => {
    dispatch(setProduct({
      ...item,
      isPreOrder: item.isPreOrder ?? true, // Default to true if not specified
      price: typeof item.price === 'string' ? parseFloat(item.price) : item.price
    }));
  };

  const clearPreorderProduct = () => {
    dispatch(clearProduct());
  };

  return { 
    product, 
    setPreorderProduct, 
    clearPreorderProduct 
  };
};