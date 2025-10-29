# React + TypeScript + Vite
📘README – Calendar View
🗓Overview

The Calendar View project is a modern React(vite) + TailWind + TypeScript application that provides an interactive scheduling and event management interface.
It includes Month and Week views, dynamic event creation, editing, and deletion with a responsive design built using TailwindCSS and Lucide icons.

🧩Folder Structure

calendar-view/
├── .storybook/                  # Storybook setup for component previews
│   ├── main.ts
│   └── preview.ts
│
├── src/
│   ├── components/
│   │   ├── Calendar/
│   │   │   ├── CalendarView.tsx         # Main Calendar container (switches between Week & Month)
│   │   │   ├── CalendarView.types.ts    # Type definitions (CalendarEvent, Props, etc.)
│   │   │   ├── EventModal.tsx           # Modal for creating/editing events
│   │   │   ├── MonthView.tsx            # Monthly grid view
│   │   │   ├── WeekView.tsx             # Weekly detailed timeline view
│   │   │   ├── *.stories.tsx            # Storybook component previews
│   │   │   └── CalendarCell.tsx         # (Optional) reusable day cell component
│   │   │
│   │   ├── primitives/                  # Base reusable UI components
│   │   │   ├── Button.tsx               # Reusable styled button
│   │   │   ├── Modal.tsx                # Generic modal component
│   │   │   ├── Select.tsx               # Styled dropdown selector
│   │   │   ├── *.stories.tsx            # Storybook demos for each primitive
│   │   │
│   │   ├── WeekViewComponents/          # Smaller modular parts of the week grid
│   │   │   ├── EventItem.tsx            # Event block in the timeline
│   │   │   ├── NowLine.tsx              # Red “Now” indicator line
│   │   │   ├── TimeSlot.tsx             # Hour block element
│   │   │   └── WeekDayHeader.tsx        # Day headers (Sun–Sat)
│   │
│   ├── data/
│   │   └── mockEvents.ts                # Sample events for local testing
│   │
│   ├── hooks/
│   │   ├── useEventManager.ts           # Manages CRUD logic for events
│   │   └── useKeyboardDrag.ts           # Handles drag & keyboard navigation (if added)
│   │
│   ├── styles/
│   │   └── globals.css                  # Tailwind base and global styles
│   │
│   ├── utils/
│   │   ├── date.utils.ts                # Date helpers (startOfWeek, isSameDay, etc.)
│   │   ├── class.utils.ts               # Conditional class merging
│   │   └── event.utils.ts               # Event-related helper logic
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.html
│
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── eslint.config.js
└── README.md

Component           Description                                                                     

CalendarView.tsx    Main container managing navigation, mode switching, and event state.            
MonthView.tsx       Displays days of the current month with event previews.                         
WeekView.tsx        Displays the week timeline with hours, events, and a dynamic “Now” line.        
EventModal.tsx      Modal to add, edit, or delete events.                                           
primitives          Reusable low-level UI components (Button, Modal, Select) for consistent design. 
hooks               Custom hooks to encapsulate logic like event management and interactions.  

⚙️Technologies Used

React 18 + TypeScript

Tailwind CSS (custom config)

Lucide-react (icons)

Storybook for UI testing

Vite or Next.js compatible structure     

