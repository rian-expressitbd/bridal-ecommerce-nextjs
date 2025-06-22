import type { Meta, StoryObj } from "@storybook/nextjs";
import React, { createContext } from "react";
import { Breadcrumb } from "./breadcrumb";

// Create a mock router context
const MockRouterContext = createContext({
  pathname: "/",
});

// Create a provider for the mock router context
const MockRouterProvider: React.FC<{ pathname: string; children: React.ReactNode }> = ({ pathname, children }) => {
  return <MockRouterContext.Provider value={{ pathname }}>{children}</MockRouterContext.Provider>;
};

// Attempt to override usePathname to read from the mock context
// This might still cause issues depending on Storybook/Next.js setup,
// but it's a common pattern for mocking hooks that read context.
// Note: Direct assignment to imported functions is generally not allowed,
// but this pattern is sometimes used in testing/mocking scenarios.
// If this causes errors, a different mocking strategy might be needed
// (e.g., using a dedicated Storybook addon for Next.js).
// const usePathname = () => {
//   const context = React.useContext(MockRouterContext);
//   return context.pathname;
// };

const meta: Meta<typeof Breadcrumb> = {
  title: "UI/Molecules/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  argTypes: {
    separator: { control: "text" },
    className: { control: "text" },
    labelMap: { control: "object" },
  },
  args: {
    separator: "/",
    className: "",
    labelMap: {},
  },
  parameters: {
    // Provide a default pathname for stories
    nextjs: {
      navigation: {
        pathname: "/products/category/item-details",
      },
    },
  },
  decorators: [
    (Story, { parameters }) => {
      const pathname = parameters.nextjs?.navigation?.pathname || "/";
      return (
        <MockRouterProvider pathname={pathname}>
          <Story />
        </MockRouterProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    pathname: "/products/category/item-details", // Explicitly set pathname for this story
  },
};

export const WithCustomSeparator: Story = {
  args: {
    separator: ">",
    pathname: "/products/category/item-details", // Explicitly set pathname
  },
};

export const WithLabelMap: Story = {
  args: {
    labelMap: {
      products: "Shop",
      category: "Electronics",
      "item-details": "Product Details",
    },
    pathname: "/products/category/item-details", // Explicitly set pathname
  },
};

export const WithCustomPathname: Story = {
  args: {
    pathname: "/dashboard/settings/profile", // Explicitly set custom pathname
  },
  parameters: {
    // Remove nextjs navigation parameter for this specific story
    // nextjs: {
    //   navigation: {
    //     pathname: "/dashboard/settings/profile",
    //   },
    // },
  },
};
