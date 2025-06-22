import type { Meta, StoryObj } from "@storybook/nextjs";
import BackButton from "./back-btn";

// Define a mock router object that mimics the App Router's useRouter return value
const mockAppRouter = {
  back: () => {
    console.log("router.back() called");
  },
  push: (href: string) => {
    console.log(`router.push(${href}) called`);
  },
  // Add other router methods used by the component if any
};

const meta: Meta<typeof BackButton> = {
  title: "UI/Molecules/BackButton",
  component: BackButton,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    variant: { control: "select", options: ["default", "destructive", "outline", "secondary", "ghost", "link"] },
    size: { control: "select", options: ["default", "sm", "lg", "icon"] },
    // Add control for the new router prop (optional, mainly for documentation)
    router: { control: "object" },
  },
  args: {
    variant: "default",
    size: "md",
    // Provide the mock router via the new prop
    router: mockAppRouter,
  },
  // Remove decorators and parameters related to old mocking
  // decorators: [],
  // parameters: {},
};

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
  args: {
    // Inherits router from meta.args
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    // Inherits router from meta.args
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    // Inherits router from meta.args
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    // Inherits router from meta.args
  },
};

// export const IconSize: Story = {
//   args: {
//     size: "icon",
//     // Inherits router from meta.args
//   },
// };
