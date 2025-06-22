import { MetaResponse } from "./metaResponse";

export interface ProductResponse {
  status: number;
  success: boolean;
  message: string;
  meta: MetaResponse;
  data: Product[];
}

export interface ProductImage {
  image: {
    secure_url?: string;
  };
}

export interface Product {
  _id: string;
  name: string;

  short_description: string;
  long_description: string;
  total_stock: number;
  images: { image: { secure_url: string } }[];
  video?: { secure_url: string }; // 👈 use this instead of `Video[]`
  variantsId: {
    _id: string;
    name?: string;
    condition: string;
    variants_values: string[];
    selling_price: number;
    offer_price: number;
    image?: { image: { secure_url: string } };
  }[];
  hasVariants: boolean;
  sub_category?: { _id: string }[];
  tags?: string[];
  createdAt: string;
}

export interface Image {
  _id: string;
  image: {
    public_id: string;
    secure_url: string;
    optimizeUrl: string;
  };
}

export interface Video {
  _id: string;
  video?: {
    public_id: string;
    secure_url: string;
  };
}

export interface Variant {
  _id: string;
  name?: string;
  variants_values: string[];
  selling_price: number;
  offer_price: number;
  image?: {
    image: {
      secure_url: string;
    };
  };
  variants_stock?: number;
  // Optional fields if not used in ProductDetail
  productId?: string;
  barcode?: string;
  sku?: string;
  condition?: string;
  // ...add other fields as optional if necessary
}
