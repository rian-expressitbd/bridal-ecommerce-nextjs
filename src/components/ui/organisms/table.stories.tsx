import type { Meta, StoryObj } from "@storybook/nextjs";
import { Table } from "./table"; // Assuming the component is exported as Table

const meta: Meta<typeof Table> = {
  title: "UI/Organisms/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    striped: {
      control: "boolean",
      description: "Applies zebra striping to table rows.",
    },
    hoverable: {
      control: "boolean",
      description: "Enables hover effect on table rows.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Sets the size of the table cells.",
    },
    onSort: {
      action: "sorted",
      description: "Callback function triggered when a sortable column header is clicked.",
    },
    loading: {
      control: "boolean",
      description: "Displays skeleton loading state.",
    },
    height: {
      control: "text",
      description: "Sets the height of the table container.",
    },
    footer: {
      control: "text", // Or 'object' if passing complex nodes
      description: "Content for the table footer.",
    },
    label: {
      control: "text",
      description: "Label displayed above the table.",
    },
    variant: {
      control: "select",
      options: ["default", "bordered", "compact"],
      description: "Sets the visual variant of the table.",
    },
    showBorder: {
      control: "boolean",
      description: "Shows or hides the table border.",
    },
    minWidth: {
      control: "text",
      description: "Sets the minimum width of the table.",
    },
    skeletonRows: {
      control: "number",
      description: "Number of skeleton rows to display when loading.",
    },
    skeletonColumns: {
      control: "number",
      description: "Number of skeleton columns to display when loading.",
    },
    emptyState: {
      control: "text", // Or 'object'
      description: "Content to display when the table is empty and not loading.",
    },
    multiSortEnabled: {
      control: "boolean",
      description: "Enables multi-column sorting.",
    },
    children: {
      control: "object", // Represents the table content (thead, tbody, tfoot)
      description: "The main content of the table (TableHeader, TableBody, TableFooter).",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

import { TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./table";

export const Default: Story = {
  args: {
    label: "Sample Data Table",
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortKey='name'>
              Name
            </TableHead>
            <TableHead sortable sortKey='age' align='center'>
              Age
            </TableHead>
            <TableHead sortable sortKey='city' align='right'>
              City
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell align='center'>30</TableCell>
            <TableCell align='right'>New York</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell align='center'>25</TableCell>
            <TableCell align='right'>London</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Peter Jones</TableCell>
            <TableCell align='center'>40</TableCell>
            <TableCell align='right'>Paris</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total: 3 rows</TableCell>
          </TableRow>
        </TableFooter>
      </>
    ),
  },
};

export const DefaultWithCaption: Story = {
  args: {
    label: "Sample Data Table",
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortKey='name'>
              Name
            </TableHead>
            <TableHead sortable sortKey='age' align='center'>
              Age
            </TableHead>
            <TableHead sortable sortKey='city' align='right'>
              City
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell align='center'>30</TableCell>
            <TableCell align='right'>New York</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell align='center'>25</TableCell>
            <TableCell align='right'>London</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Peter Jones</TableCell>
            <TableCell align='center'>40</TableCell>
            <TableCell align='right'>Paris</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total: 3 rows</TableCell>
          </TableRow>
        </TableFooter>
        <TableCaption>A simple example table.</TableCaption>
      </>
    ),
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
    skeletonRows: 3,
    skeletonColumns: 3,
  },
};

export const EmptyState: Story = {
  args: {
    ...Default.args,
    children: null, // Explicitly set children to null for empty state
    emptyState: "No items match your criteria.",
  },
};

export const StripedTable: Story = {
  args: {
    ...Default.args,
    striped: true,
  },
};

export const BorderedTable: Story = {
  args: {
    ...Default.args,
    variant: "bordered",
  },
};

export const CompactTable: Story = {
  args: {
    ...Default.args,
    variant: "compact",
  },
};

export const SmallTable: Story = {
  args: {
    ...Default.args,
    size: "sm",
  },
};

export const LargeTable: Story = {
  args: {
    ...Default.args,
    size: "lg",
  },
};

export const MultiSortEnabled: Story = {
  args: {
    ...Default.args,
    multiSortEnabled: true,
  },
};
