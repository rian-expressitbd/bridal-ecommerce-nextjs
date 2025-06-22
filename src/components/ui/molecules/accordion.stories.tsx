import type { Meta, StoryObj } from "@storybook/nextjs";
import { Accordion } from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Molecules/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    trigger: { control: "text" },
    children: { control: "text" },
  },
  args: {
    trigger: "Accordion Title",
    children: "Accordion Content goes here.",
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {},
};

// Example of a controlled component story if needed, but Accordion manages its own state internally
// const ControlledAccordion = (args: any) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleAccordion = () => setIsOpen(!isOpen);
//   return (
//     <Accordion {...args}>
//       <AccordionTrigger onClick={toggleAccordion} isOpen={isOpen}>
//         {args.trigger}
//       </AccordionTrigger>
//       <AccordionContent isOpen={isOpen}>
//         {args.children}
//       </AccordionContent>
//     </Accordion>
//   );
// };

// export const Controlled: Story = {
//   render: ControlledAccordion,
//   args: {
//     trigger: 'Controlled Accordion Title',
//     children: 'Controlled Accordion Content.',
//   },
// };
