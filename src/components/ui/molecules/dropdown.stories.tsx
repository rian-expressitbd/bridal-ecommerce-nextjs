import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { Button } from "../atoms/button";
import { Dropdown, DropdownContent, DropdownTrigger } from "./dropdown";

// Define the props type for the Dropdown component
type DropdownProps = {
  className?: string;
  align?: "left" | "right" | "center";
  isDropdownOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

const meta: Meta<typeof Dropdown> = {
  title: "UI/Molecules/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    align: { control: "radio", options: ["left", "right", "center"] },
    isDropdownOpen: { control: "boolean" },
    onOpenChange: { action: "openChange" },
  },
  args: {
    align: "left",
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          <Button title='Toggle Dropdown'>Toggle Dropdown</Button>
        </DropdownTrigger>
        <DropdownContent>
          <div className='p-4'>
            <p>Dropdown content goes here.</p>
            <button className='mt-2 text-blue-500 hover:underline'>Action 1</button>
            <br />
            <button className='text-blue-500 hover:underline'>Action 2</button>
          </div>
        </DropdownContent>
      </>
    ),
  },
};

export const AlignRight: Story = {
  args: {
    align: "right",
    children: (
      <>
        <DropdownTrigger>
          <Button title='Right Aligned'>Right Aligned</Button>
        </DropdownTrigger>
        <DropdownContent>
          <div className='p-4'>
            <p>This dropdown is aligned to the right.</p>
          </div>
        </DropdownContent>
      </>
    ),
  },
};

export const AlignCenter: Story = {
  args: {
    align: "center",
    children: (
      <>
        <DropdownTrigger>
          <Button title='Center Aligned'>Center Aligned</Button>
        </DropdownTrigger>
        <DropdownContent>
          <div className='p-4'>
            <p>This dropdown is centered.</p>
          </div>
        </DropdownContent>
      </>
    ),
  },
};

// Example of a controlled dropdown with proper typing
const ControlledDropdown = (args: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(args.isDropdownOpen || false);
  const handleOpenChange = (newOpenState: boolean) => {
    setIsOpen(newOpenState);
    args.onOpenChange?.(newOpenState); // Optional chaining in case onOpenChange is undefined
  };

  return (
    <Dropdown {...args} isDropdownOpen={isOpen} onOpenChange={handleOpenChange}>
      <DropdownTrigger>
        <Button title='Controlled Toggle'>Controlled Toggle</Button>
      </DropdownTrigger>
      <DropdownContent>
        <div className='p-4'>
          <p>This dropdown is controlled externally.</p>
          <p>Current state: {isOpen ? "Open" : "Closed"}</p>
        </div>
      </DropdownContent>
    </Dropdown>
  );
};

export const Controlled: Story = {
  render: ControlledDropdown,
  args: {
    isDropdownOpen: false, // Initial state
    align: "left",
  },
};