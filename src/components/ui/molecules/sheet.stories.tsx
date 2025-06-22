import type { Meta, StoryObj } from "@storybook/nextjs";
import { Sheet } from "./sheet"; // Assuming the component is exported as Sheet and subcomponents

const meta: Meta<typeof Sheet> = {
  title: "UI/Molecules/Sheet",
  component: Sheet,
  parameters: {
    layout: "fullscreen", // Use fullscreen layout for sheets
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls the visibility of the sheet.",
    },
    onClose: {
      action: "closed",
      description: "Callback function when the sheet is closed.",
    },
    position: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
      description: "Position of the sheet.",
    },
    children: {
      control: "text",
      description: "Content to be displayed inside the sheet body.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the sheet container.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "Size of the sheet.",
    },
    disableClickOutside: {
      control: "boolean",
      description: "Disable closing the sheet by clicking outside.",
    },
    showCloseButton: {
      control: "boolean",
      description: "Whether to show the close button in the header.",
    },
    showHeader: {
      control: "boolean",
      description: "Whether to show the sheet header.",
    },
    showFooter: {
      control: "boolean",
      description: "Whether to show the sheet footer.",
    },
    title: {
      control: "text",
      description: "Title displayed in the sheet header.",
    },
    disableEscapeKey: {
      control: "boolean",
      description: "Disable closing the sheet with the Escape key.",
    },
    overlayClassName: {
      control: "text",
      description: "Additional CSS classes for the overlay.",
    },
    preventScroll: {
      control: "boolean",
      description: "Prevent body scrolling when the sheet is open.",
    },
    // initialFocusRef: { // Ref props are not easily controllable in Storybook args
    //   control: 'object',
    //   description: 'Ref to the element that should receive initial focus.',
    // },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Default Sheet Title",
    children: '<div className="p-4"><p>This is the default sheet content.</p></div>',
    position: "right",
    size: "md",
    showHeader: true,
    showFooter: false,
    showCloseButton: true,
    disableClickOutside: false,
    disableEscapeKey: false,
    preventScroll: true,
  },
};

export const LeftSheet: Story = {
  args: {
    ...Default.args,
    title: "Left Sheet",
    position: "left",
  },
};

export const TopSheet: Story = {
  args: {
    ...Default.args,
    title: "Top Sheet",
    position: "top",
  },
};

export const BottomSheet: Story = {
  args: {
    ...Default.args,
    title: "Bottom Sheet",
    position: "bottom",
    showFooter: true,
    children: '<div className="p-4"><p>This is the bottom sheet content.</p></div>',
    // Example footer content - replace with actual footer elements if needed
    // footer: '<div className="p-4 border-t border-gray-200 dark:border-gray-700">Footer Content</div>',
  },
};

export const FullSizeSheet: Story = {
  args: {
    ...Default.args,
    title: "Full Size Sheet",
    size: "full",
  },
};

export const WithoutHeaderAndFooter: Story = {
  args: {
    ...Default.args,
    title: undefined,
    showHeader: false,
    showFooter: false,
    children: '<div className="p-4"><p>This sheet has no header or footer.</p></div>',
  },
};

export const DisabledClickOutside: Story = {
  args: {
    ...Default.args,
    title: "Click Outside Disabled",
    disableClickOutside: true,
  },
};
