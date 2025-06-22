import { TCartItem } from "./cart";

export interface OnlineOrderPayload {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  delivery_area: string;
  products: TCartItem[];
  note?: string;
  due: string;
}

export interface OnlineOrderResponse {
  success: boolean;
  orderId?: string;
  message?: string;
}
