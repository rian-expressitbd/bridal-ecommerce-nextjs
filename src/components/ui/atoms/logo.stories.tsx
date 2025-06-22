import { makeStore } from "@/lib/store";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Provider } from "react-redux";
import Logo from "./logo";

const store = makeStore();

const meta: Meta<typeof Logo> = {
  title: "UI/Atoms/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
