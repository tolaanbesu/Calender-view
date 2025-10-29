# React + TypeScript + Vite
📘README – Calendar View
# Calendar View Component

##  Live Storybook  
[Your Deployed Storybook URL]  

##  Installation  
```bash
npm install
npm run storybook

## Architecture
The Calendar View component is built using React + TypeScript and structured into modular components:

CalendarView – main container handling state, navigation, and view mode (month/week).

MonthView – displays a 6x7 grid calendar for month view, uses CalendarCell for each day.

WeekView – displays days as columns with hourly time slots, supports events per day.

CalendarCell – represents each day in MonthView, shows events and allows quick-add.

EventModal – modal for creating/editing events.
Hooks such as useCalendar and useEventManager manage state and event handling. Tailwind CSS handles styling and responsiveness.

## Features

 Month/Week views

 Event management (create, edit, delete)

 Responsive design (mobile & desktop)

 Keyboard accessibility (drag & interaction support)

## Storybook Stories

CalendarView / Default

CalendarView / Month View

CalendarView / Week View

CalendarCell / Default

EventModal / Create Event

EventModal / Edit Event

## Technologies

React + TypeScript

Tailwind CSS

Storybook

## Contact
tolaanbesu927@gmail.com