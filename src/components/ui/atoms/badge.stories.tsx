import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge, PriceBadge, StatusBadge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "blue", "orange", "purple", "green", "red", "yellow", "gray"],
    },
    children: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Default Badge",
    variant: "default",
  },
};

export const Blue: Story = {
  args: {
    children: "Blue Badge",
    variant: "blue",
  },
};

export const Orange: Story = {
  args: {
    children: "Orange Badge",
    variant: "orange",
  },
};

export const Purple: Story = {
  args: {
    children: "Purple Badge",
    variant: "purple",
  },
};

export const Green: Story = {
  args: {
    children: "Green Badge",
    variant: "green",
  },
};

export const Red: Story = {
  args: {
    children: "Red Badge",
    variant: "red",
  },
};

export const Yellow: Story = {
  args: {
    children: "Yellow Badge",
    variant: "yellow",
  },
};

export const Gray: Story = {
  args: {
    children: "Gray Badge",
    variant: "gray",
  },
};

// const metaStatus: Meta<typeof StatusBadge> = {
//   title: "UI/Atoms/StatusBadge",
//   component: StatusBadge,
//   tags: ["autodocs"],
//   argTypes: {
//     isActive: {
//       control: "boolean",
//     },
//     activeText: {
//       control: "text",
//     },
//     inactiveText: {
//       control: "text",
//     },
//   },
// };

export const StatusActive: StoryObj<typeof StatusBadge> = {
  args: {
    isActive: true,
    activeText: "Active",
    inactiveText: "Inactive",
  },
};

export const StatusInactive: StoryObj<typeof StatusBadge> = {
  args: {
    isActive: false,
    activeText: "Active",
    inactiveText: "Inactive",
  },
};

// const metaPrice: Meta<typeof PriceBadge> = {
//   title: "UI/Atoms/PriceBadge",
//   component: PriceBadge,
//   tags: ["autodocs"],
//   argTypes: {
//     value: {
//       control: "text",
//     },
//     label: {
//       control: "text",
//     },
//     variant: {
//       control: "select",
//       options: ["blue", "purple", "green", "red", "yellow", "gray", "orange"],
//     },
//     currency: {
//       control: "text",
//     },
//   },
// };

export const Price: StoryObj<typeof PriceBadge> = {
  args: {
    value: 123.45,
    label: "Price",
    variant: "orange",
    currency: "৳",
  },
};
