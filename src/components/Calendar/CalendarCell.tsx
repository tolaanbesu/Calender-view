import React from 'react';
import { CalendarEvent } from './CalendarView.types';

interface Props{
    date: Date;
    events: CalendarEvent[];
    isToday: boolean;
    isCurrentMonth: boolean;
    onClick: (date:Date) => void;
}

export const CalendarCell: React.FC<Props> = ({ date, events, isToday, isCurrentMonth, onClick }) => {
    return (
        <div 
         role="button"
         tabIndex={0}
         aria-label={`${date.toDateString()}.${events.length} events.`}
         onClick={()=>onClick(date)}
         onKeyDown={(e)=>{if(e.key === 'Enter') onClick(date);}}
         className={`border p-2 h-32 cursor-pointer ${!isCurrentMonth ? 'text-neutral-400': ''}`}
         >
            <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-medium">{date.getDate()}</span>

                {
                isToday && <span className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
                                {date.getDate()}
                            </span>
                }
            </div>
            <div className="space-y-1 overflow-hidden">
                {
                events.slice(0, 3).map(e => (
                <div key={e.id} className="text-xs px-2 py-1 rounded truncate" style={{ backgroundColor: e.color }}>{e.title}</div>
                ))
                }
                {
                events.length > 3 && (<button className="text-xs text-primary-600 hover:underline">+{events.length - 3} more</button>)
                }
            </div>


        </div>
    )
}