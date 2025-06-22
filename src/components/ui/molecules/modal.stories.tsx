import type { Meta, StoryObj } from "@storybook/nextjs";
import Modal from "./modal"; // Assuming the component is exported as default

const meta: Meta<typeof Modal> = {
  title: "UI/Molecules/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isModalOpen: {
      control: "boolean",
      description: "Controls the visibility of the modal.",
    },
    onClose: {
      action: "closed",
      description: "Callback function when the modal is closed.",
    },
    title: {
      control: "text",
      description: "Title displayed in the modal header.",
    },
    children: {
      control: "text",
      description: "Content to be displayed inside the modal body.",
    },
    showHeader: {
      control: "boolean",
      description: "Whether to show the modal header.",
    },
    showFooter: {
      control: "boolean",
      description: "Whether to show the modal footer.",
    },
    onConfirm: {
      action: "confirmed",
      description: "Callback function when the confirm button is clicked.",
    },
    confirmText: {
      control: "text",
      description: "Text for the confirm button.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the modal.",
    },
    disableClickOutside: {
      control: "boolean",
      description: "Disable closing the modal by clicking outside.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isModalOpen: true,
    title: "Default Modal Title",
    children: "<p>This is the default modal content.</p>",
    showHeader: true,
    showFooter: true,
    confirmText: "Confirm",
    size: "md",
    disableClickOutside: false,
  },
};

export const WithoutHeaderAndFooter: Story = {
  args: {
    isModalOpen: true,
    children: "<p>This modal has no header or footer.</p>",
    showHeader: false,
    showFooter: false,
    size: "md",
    disableClickOutside: false,
  },
};

export const LargeModal: Story = {
  args: {
    isModalOpen: true,
    title: "Large Modal",
    children: "<p>This is a large modal.</p>",
    showHeader: true,
    showFooter: true,
    confirmText: "Proceed",
    size: "lg",
    disableClickOutside: false,
  },
};

export const SmallModal: Story = {
  args: {
    isModalOpen: true,
    title: "Small Modal",
    children: "<p>This is a small modal.</p>",
    showHeader: true,
    showFooter: true,
    confirmText: "OK",
    size: "sm",
    disableClickOutside: false,
  },
};

export const DisabledClickOutside: Story = {
  args: {
    isModalOpen: true,
    title: "Click Outside Disabled",
    children: "<p>You cannot close this modal by clicking outside.</p>",
    showHeader: true,
    showFooter: true,
    confirmText: "Got It",
    size: "md",
    disableClickOutside: true,
  },
};
