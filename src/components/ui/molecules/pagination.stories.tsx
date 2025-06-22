import type { Meta, StoryObj } from "@storybook/nextjs";
import { Pagination } from "./pagination"; // Assuming the component is exported as Pagination

const meta: Meta<typeof Pagination> = {
  title: "UI/Molecules/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: "number",
      description: "The current active page number.",
    },
    totalPages: {
      control: "number",
      description: "The total number of pages.",
    },
    onPageChange: {
      action: "pageChanged",
      description: "Callback function when the page changes.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the container.",
    },
    itemsPerPage: {
      control: "number",
      description: "Number of items displayed per page.",
    },
    totalItems: {
      control: "number",
      description: "Total number of items across all pages.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 10,
    totalItems: 100,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    itemsPerPage: 10,
    totalItems: 100,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    itemsPerPage: 10,
    totalItems: 100,
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 3,
    itemsPerPage: 10,
    totalItems: 30,
  },
};

export const NoItems: Story = {
  args: {
    currentPage: 0,
    totalPages: 0,
    itemsPerPage: 10,
    totalItems: 0,
  },
};
