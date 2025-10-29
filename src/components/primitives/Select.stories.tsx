
import { Select, SelectOption } from "./Select";
import { Meta, StoryObj } from "@storybook/react";

const options: SelectOption[] = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2", disabled: true },
];

const meta: Meta<typeof Select> = {
  title: "Primitives/Select",
  component: Select,
};

export default meta;

export const Default: StoryObj<typeof Select> = {
  args: {
    options: options,
  },
};

export const WithDisabledOption: StoryObj<typeof Select> = {
  args: {
    options: options,
  },
};
