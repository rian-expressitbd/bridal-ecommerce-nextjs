import type { Meta, StoryObj } from "@storybook/nextjs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const meta: Meta<typeof Card> = {
  title: "UI/Molecules/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "elevated", "outline", "filled"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
    className: { control: "text" },
  },
  args: {
    variant: "default",
    size: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card has an elevated shadow.</p>
        </CardContent>
      </>
    ),
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: (
      <>
        <CardHeader>
          <CardTitle>Outline Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card has an outline border.</p>
        </CardContent>
      </>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
    children: (
      <>
        <CardHeader>
          <CardTitle>Filled Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card has a filled background.</p>
        </CardContent>
      </>
    ),
  },
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    children: (
      <>
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card uses the small size padding.</p>
        </CardContent>
      </>
    ),
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
    children: (
      <>
        <CardHeader>
          <CardTitle>Large Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card uses the large size padding.</p>
        </CardContent>
      </>
    ),
  },
};

export const CardWithOnlyContent: Story = {
  args: {
    children: (
      <CardContent>
        <p>Card with only content.</p>
      </CardContent>
    ),
  },
};
