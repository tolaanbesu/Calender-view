import type { Meta, StoryObj } from '@storybook/react';
import CalendarView from './CalendarView';
import { MOCK_EVENTS, EMPTY_EVENTS } from '../../data/mockEvents';
import { CalendarEvent, ViewMode } from '../../components/Calendar/CalendarView.types';

import React from 'react';

// Define a type for the useState function signature to match all overloads
type UseStateFunction = typeof React.useState;

// --- IMPORTANT: This MOCK safely intercepts the internal useState calls ---
// It allows us to control the initial state for 'events' and 'viewMode'
// without getting into complex TypeScript errors related to hook overloads.
const CalendarViewMock = ({ initialEvents = MOCK_EVENTS, initialViewMode = 'week' }: {
    initialEvents?: CalendarEvent[];
    initialViewMode?: ViewMode;
}) => {
    // Save the original useState for safety
    const originalUseState: UseStateFunction = React.useState;

    // Use a flag to track if we've already mocked the states for this instance
    let eventsMocked = false;
    let viewModeMocked = false;

    // Helper function with type assertion to intercept useState calls
    const mockUseStateInterceptor: UseStateFunction = <S,>(initialState?: S | (() => S)): [S | undefined, React.Dispatch<React.SetStateAction<S | undefined>>] => {
        // Define the target return type explicitly for casting
        type InterceptorReturn = [S | undefined, React.Dispatch<React.SetStateAction<S | undefined>>];

        // Intercept the initial events array (usually [])
        if (!eventsMocked && Array.isArray(initialState) && initialState.length === 0) {
            eventsMocked = true;
            // The assertion below is safe because we know we are returning an array of CalendarEvent[]
            return originalUseState(initialEvents as S) as InterceptorReturn;
        }

        // Intercept the initial view mode (usually 'week' or 'month')
        if (!viewModeMocked && typeof initialState === 'string' && (initialState === 'week' || initialState === 'month')) {
            viewModeMocked = true;
            // The assertion below is safe because we know we are returning 'week' or 'month'
            return originalUseState(initialViewMode as S) as InterceptorReturn;
        }

        // For all other useState calls (like currentDate, isModalOpen, etc.), use the original
        // We use 'as any' here only to satisfy the complex generic overloads of the original function 
        // when no arguments are provided, which is the root of the error.
        return originalUseState(initialState as any) as InterceptorReturn;
    };

    // Temporarily replace useState for this render cycle using the defined type cast
    (React as { useState: UseStateFunction }).useState = mockUseStateInterceptor;

    // Render the actual component
    const element = <CalendarView />;

    // Restore the original useState after rendering
    (React as { useState: UseStateFunction }).useState = originalUseState;

    return element;
};
// --- END MOCK ---

const meta: Meta<typeof CalendarView> = {
  title: 'Calendar/CalendarView',
  component: CalendarViewMock,
  tags: ['autodocs'],
  parameters: {
    // Center layout for presentation, but keep it full-width for calendar structure
    layout: 'fullscreen',
  },
  // We hide the initialEvents/initialViewMode args as they are for internal mocking
  argTypes: {
    initialEvents: {
        table: { disable: true },
    },
    initialViewMode: {
        table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarViewMock>;

export const DefaultWeekView: Story = {
  name: 'Full Calendar - Week View',
  args: {
    initialEvents: MOCK_EVENTS,
    initialViewMode: 'week',
  },
  render: (args) => <CalendarViewMock {...args} />,
};

export const DefaultMonthView: Story = {
  name: 'Full Calendar - Month View',
  args: {
    initialEvents: MOCK_EVENTS,
    initialViewMode: 'month',
  },
  render: (args) => <CalendarViewMock {...args} />,
};

export const EmptyState: Story = {
  name: 'Empty Calendar - Month View',
  args: {
    initialEvents: EMPTY_EVENTS,
    initialViewMode: 'month',
  },
  render: (args) => <CalendarViewMock {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Shows the calendar with no events initially loaded. The user can click "New Event" or click on a date to start adding events.',
      },
    },
  },
};
