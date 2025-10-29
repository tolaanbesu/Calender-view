import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from './Button';
import React, { useState } from 'react';

// Define the base props interface for clarity
interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const meta: Meta<typeof Modal> = {
  title: 'Primitives/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: 'Controls the visibility of the modal.' },
    onClose: { action: 'closed', description: 'Function called when the modal is requested to close.' },
    title: { control: 'text', description: 'Optional title displayed in the modal header.' },
    children: { control: 'object', description: 'The content of the modal body.' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// This component wraps the Modal to manage its state for interaction testing
// We only omit 'open', ensuring 'onClose' is available in args.
const ModalWrapper = (args: Omit<ModalProps, 'open'>) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
    // onClose is now correctly included in args
    args.onClose(); 
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} open={isOpen} onClose={handleClose}>
        {args.children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Confirm Operation',
    children: (
      <div className="space-y-4">
        <p className="text-neutral-600">
          This is a sample modal with some content. You can confirm or cancel this action.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => console.log('Cancel')}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => console.log('Confirm')}>
            Confirm
          </Button>
        </div>
      </div>
    ),
    onClose: () => console.log('Modal closed via backdrop/esc'),
  },
};

export const WithoutTitle: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: undefined,
    children: (
      <p className="text-center p-4 text-neutral-700">
        A modal without a title, centered content.
      </p>
    ),
    onClose: () => console.log('Modal closed'),
  },
};
