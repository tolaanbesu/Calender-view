// src/components/Calendar/CalendarCell.tsx
import React from "react";
import { CalendarCellProps } from "./CalendarView.types";

export const CalendarCell: React.FC<CalendarCellProps>=({date,events,isToday,isCurrentMonth,onClick,openModal,}) => {
  return (
    <div
      role="gridcell"
      tabIndex={0}
      aria-label={`${date.toDateString()}. ${events.length} events.`}
      onClick={() => onClick(date)} // click the empty area = add new event
      onKeyDown={(e) => {if (e.key === "Enter") onClick(date);}}
      className={`border p-2 h-32 cursor-pointer relative group transition ${ !isCurrentMonth ? 
        "bg-neutral-50 text-neutral-400 hover:bg-neutral-100" : "bg-white hover:bg-blue-50/50" } 
        ${isToday ? "ring-2 ring-blue-500 ring-offset-1 z-10" : ""}`}
    >
      {/* Top Section (Date number+highlight for today) */}
      <div className="flex justify-between items-start mb-1">
        {!isToday && (
          <span className="text-sm font-medium">{date.getDate()}</span>
        )}

        {isToday && (
          <span className="w-6 h-6 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">
            {date.getDate()}
          </span>
        )}
      </div>

      {/* Events list */}
      <div className="space-y-1 overflow-auto max-h-[5rem] pb-4">
        {events.slice(0, 3).map((e) => (
          <div
            key={e.id}
            className="text-xs px-2 py-1 rounded truncate text-white shadow-sm hover:opacity-80 transition-opacity"
            style={{ backgroundColor: e.color }}
            tabIndex={0}
            role="button"
            aria-label={`Event: ${e.title}, from ${e.startDate.toLocaleTimeString()} to ${e.endDate.toLocaleTimeString()}`}
            onKeyDown={(ev) => {
              if (ev.key === "Enter" || ev.key === " "){
                ev.stopPropagation();
                openModal?.(e);
              }
            }} 
            onClick={(ev)=>{
              ev.stopPropagation();  // prevent triggering the date click
              openModal?.(e);        // open event modal
            }}
          >
            {e.title}
          </div>
        ))}

        {/* “+ more” indicator if there are hidden events */}
        {events.length > 3 && (
          <div className="absolute bottom-1 left-2 text-xs text-blue-600 hover:underline">
            +{events.length - 3} more
          </div>
        )}
      </div>

      {/* Quick Add Button (appears on hover) */}
      <button
        className="absolute top-1 right-1 p-1 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-blue-100"
        onClick={(e) => {
          e.stopPropagation();
          onClick(date);
        }}
        aria-label={`Quick add event on ${date.toDateString()}`}
        title={`Quick add event on ${date.toDateString()}`}
      >
        +
      </button>
    </div>
  );
};
