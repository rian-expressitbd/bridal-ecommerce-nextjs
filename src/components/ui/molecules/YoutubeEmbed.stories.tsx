import type { Meta, StoryObj } from "@storybook/nextjs";
import YouTubeEmbed from "./YoutubeEmbed";

const meta: Meta<typeof YouTubeEmbed> = {
  title: "UI/Molecules/YouTubeEmbed",
  component: YouTubeEmbed,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof YouTubeEmbed>;

export const Default: Story = {
  args: {
    src: "dQw4w9WgXcQ", // Example video ID (Rick Astley - Never Gonna Give You Up)
    title: "Example YouTube Video",
  },
};

export const WithFullUrl: Story = {
  args: {
    src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Example full URL
    title: "Example YouTube Video (Full URL)",
  },
};

export const CustomSize: Story = {
  args: {
    src: "dQw4w9WgXcQ",
    title: "Example YouTube Video (Custom Size)",
    width: 640,
    height: 360,
  },
};
