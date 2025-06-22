import { AppProviders } from "@/lib/Provider/AppProvider"; // Keep AppProviders import
import { type TCartItem } from "@/types/cart"; // Import TCartItem type
import type { Args, Meta, StoryObj } from "@storybook/nextjs"; // Use @storybook/nextjs, import Args here
import { CartSheet } from "./cart-sheet"; // Import CartSheetProps

// Mock hooks (basic mocks without jest.mock calls here)
// Mock the useBusiness hook to return mock data
const mockUseBusiness = () => ({
  businessData: {
    currency: ["USD"],
    // Add other necessary business data properties if the component uses them
  },
  isLoading: false,
  error: null,
});

// Mock the useCart hook to return mock data and functions
const mockUseCart = (items: TCartItem[] = []) => ({
  // Use TCartItem[] type
  items: items,
  itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  isOpen: true, // Start open for demonstration
  // subtotal calculation removed as TCartItem doesn't have price
  removeItem: (productId: string) => console.log(`Remove item: ${productId}`), // Changed id to productId
  closeCart: () => console.log("Close cart"),
  openCart: () => console.log("Open cart"),
});

const meta: Meta<typeof CartSheet> = {
  title: "UI/Organisms/CartSheet",
  component: CartSheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <AppProviders>
        {/* BusinessProvider is removed, useBusiness is mocked */}
        <Story />
      </AppProviders>
    ),
  ],
  // Provide mocked dependencies to the component
  render: (args: unknown) => {
    // Use Args without generic type, remove unused context
    // Use the mock hooks within the render function
    // Directly use the mock hooks here
    mockUseBusiness(); // Call the mock hook
    mockUseCart((args as Args).initialItems as TCartItem[]); // Call the mock hook with initialItems arg, cast to TCartItem[]

    // Render the component with mocked dependencies
    return (
      <CartSheet
      // Pass mocked hook values and components as props if the component accepts them,
      // or rely on the component using the mocked hooks directly.
      // For this component, it uses hooks directly, so we just need to ensure the hooks are mocked.
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCartItems: TCartItem[] = [
  // Use TCartItem[] type, matching the actual type definition
  { productId: "1", quantity: 1 },
  { productId: "2", quantity: 3 },
];

export const EmptyCart: Story = {
  args: {
    initialItems: [], // Use an arg to control initial cart state
  },
};

export const WithItems: Story = {
  args: {
    initialItems: mockCartItems, // Use an arg to control initial cart state
  },
};
