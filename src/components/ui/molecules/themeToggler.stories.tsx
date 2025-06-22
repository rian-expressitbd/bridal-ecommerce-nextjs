import { makeStore } from "@/lib/store"; // Import makeStore from the store file
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Provider } from "react-redux"; // Import Provider from react-redux
import ThemeToggler from "./themeToggler";

const meta: Meta<typeof ThemeToggler> = {
  title: "UI/Molecules/ThemeToggler",
  component: ThemeToggler,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => {
      const store = makeStore();
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeToggler>;

export const Default: Story = {
  args: {},
};
