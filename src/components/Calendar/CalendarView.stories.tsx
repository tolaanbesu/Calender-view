import type { Meta, StoryObj } from '@storybook/react';
import CalendarView from './CalendarView';
import { MOCK_EVENTS, EMPTY_EVENTS } from '../../data/mockEvents';

const meta: Meta<typeof CalendarView> = {
  title: 'Calendar/CalendarView',
  component: CalendarView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    initialEvents: { control: 'object' },
    initialViewMode: { control: 'select', options: ['month', 'week'] },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarView>;

export const DefaultWeekView: Story = {
  name: 'Full Calendar - Week View (20+ Events)',
  args: {
    initialEvents: MOCK_EVENTS,
    initialViewMode: 'week',
  },
  render: (args) => <CalendarView {...args} />,
};

// Full Calendar Story (20+ Events)
export const FullEventsMonthView: Story = {
  name: 'Full Calendar - Month View (20+ Events)',
  args: {
    initialEvents: MOCK_EVENTS,
    initialViewMode: 'month',
  },
  render: (args) => <CalendarView {...args} />,
};


// Empty State Story
export const EmptyState: Story = {
  name: 'Empty Calendar - Month View',
  args: {
    initialEvents: EMPTY_EVENTS,
    initialViewMode: 'month',
  },
  render: (args) => <CalendarView {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Shows the calendar with no events initially loaded. The user can click "New Event" or click on a date to start adding events.',
      },
    },
  },
};