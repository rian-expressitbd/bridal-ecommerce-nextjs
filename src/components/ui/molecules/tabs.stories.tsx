import type { Meta, StoryObj } from "@storybook/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"; // Assuming the components are exported

const meta: Meta<typeof Tabs> = {
  title: "UI/Molecules/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
      description: "The value of the tab that should be active by default.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the container.",
    },
    children: {
      control: "object",
      description: "The TabsList and TabsContent components.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
        <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
        <TabsTrigger value='tab3'>Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value='tab1'>Content for Tab 1.</TabsContent>
      <TabsContent value='tab2'>Content for Tab 2.</TabsContent>
      <TabsContent value='tab3'>Content for Tab 3.</TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: "tab1",
  },
};

export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value='tabA'>Tab A</TabsTrigger>
        <TabsTrigger value='tabB' disabled>
          Tab B (Disabled)
        </TabsTrigger>
        <TabsTrigger value='tabC'>Tab C</TabsTrigger>
      </TabsList>
      <TabsContent value='tabA'>Content for Tab A.</TabsContent>
      <TabsContent value='tabB'>Content for Tab B.</TabsContent>
      <TabsContent value='tabC'>Content for Tab C.</TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: "tabA",
  },
};

export const CustomClassNames: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList className='bg-blue-100'>
        <TabsTrigger value='tabX' className='text-blue-700'>
          Tab X
        </TabsTrigger>
        <TabsTrigger value='tabY' className='text-blue-700'>
          Tab Y
        </TabsTrigger>
      </TabsList>
      <TabsContent value='tabX' className='border-blue-500'>
        Content for Tab X.
      </TabsContent>
      <TabsContent value='tabY' className='border-blue-500'>
        Content for Tab Y.
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: "tabX",
    className: "w-96",
  },
};
