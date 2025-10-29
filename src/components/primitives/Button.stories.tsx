import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Settings, Trash2 } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'outline'],
      description: 'The visual style of the button.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button.',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the button is disabled and unclickable.',
    },
    children: {
      control: 'text',
      description: 'The content inside the button.',
    },
    onClick: { action: 'clicked' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Action',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Action',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete Item',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'View Details',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    variant: 'primary',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    variant: 'primary',
    children: 'Large Button',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </>
    ),
  },
};

export const DangerWithIcon: Story = {
  args: {
    variant: 'danger',
    size: 'sm',
    children: (
      <>
        <Trash2 className="w-4 h-4 mr-1" />
        Delete
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Cannot Click',
    disabled: true,
  },
};