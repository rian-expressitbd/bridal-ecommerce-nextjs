import type { Meta, StoryObj } from "@storybook/nextjs";
import { CartItem } from "./cartItem";

// Define a proper type for your cart item
type CartItemType = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  maxStock: number;
};

const meta: Meta<typeof CartItem> = {
  title: "UI/Molecules/CartItem",
  component: CartItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCartItem: CartItemType = {
  _id: "1",
  name: "Sample Product",
  price: 100,
  image: "https://via.placeholder.com/150",
  quantity: 2,
  maxStock: 10,
};

export const Default: Story = {
  args: {
    item: mockCartItem,
    onRemove: () => alert("Remove item"),
  },
};

export const WithQuantityControls: Story = {
  args: {
    item: { ...mockCartItem, quantity: 5 },
    onRemove: () => alert("Remove item"),
    onQuantityChange: (id: string, quantity: number) =>
      alert(`ID: ${id} | Quantity changed to ${quantity}`),
    showQuantityControls: true,
  },
};
