// src/hooks/usePreorder.ts
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { setProduct, clearProduct } from "@/lib/features/preorder/preorderSlice";

interface PreorderItem {
  productId: string;
  name: string;
  quantity: number;
  isPreOrder:boolean;
  price: number;
  variantId?: string | null;
  variantName?: string | null;
  image?: string;
}

export const usePreorder = () => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.preorder.product);

  const setPreorderProduct = (item: PreorderItem) => {
    dispatch(setProduct({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      isPreOrder:item.isPreOrder,
      price: item.price,
      variantId: item.variantId || null,
      variantName: item.variantName || null,
      image: item.image || ''
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