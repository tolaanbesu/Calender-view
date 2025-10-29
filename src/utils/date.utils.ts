/**
 Date Utility Wrappers for date-fns.
 */
import {startOfWeek as dfnStartOfWeek,
      endOfWeek as dfnEndOfWeek,
      startOfMonth as dfnStartOfMonth,
      endOfMonth as dfnEndOfMonth,
      addMonths as dfnAddMonths,
      subMonths as dfnSubMonths,
      addWeeks as dfnAddWeeks,
      subWeeks as dfnSubWeeks,
      format as dfnFormat,
      isSameDay as dfnIsSameDay,
      isSameMonth as dfnIsSameMonth,
      isToday as dfnIsToday,
      isBefore as dfnIsBefore,
      isAfter as dfnIsAfter,
      getUnixTime as dfnGetUnixTime,
      getDay as dfnGetDay,
      set as dfnSet,
      eachHourOfInterval,
      isPast,
      isWithinInterval,
} from "date-fns";

const OPTIONS = { weekStartsOn: 0 } as const; // Sunday start for the week

export const startOfWeek = (date: Date): Date => dfnStartOfWeek(date, OPTIONS);
export const endOfWeek = (date: Date): Date => dfnEndOfWeek(date, OPTIONS);
export const startOfMonth = (date: Date): Date => dfnStartOfMonth(date);
export const endOfMonth = (date: Date): Date => dfnEndOfMonth(date);
export const addMonths = (date: Date, amount: number): Date =>dfnAddMonths(date, amount);
export const subMonths = (date: Date, amount: number): Date =>dfnSubMonths(date, amount);
export const addWeeks = (date: Date, amount: number): Date =>dfnAddWeeks(date, amount);
export const subWeeks = (date: Date, amount: number): Date =>dfnSubWeeks(date, amount);
export const format = (date: Date, fmt: string): string => dfnFormat(date, fmt);
export const isSameDay = (date1: Date, date2: Date): boolean =>dfnIsSameDay(date1, date2);
export const isSameMonth = (date1: Date, date2: Date): boolean =>dfnIsSameMonth(date1, date2);
export const isToday = (date: Date): boolean => dfnIsToday(date);
export const isBefore = (date1: Date, date2: Date): boolean => dfnIsBefore(date1, date2);
export const isAfter = (date1: Date, date2: Date): boolean =>dfnIsAfter(date1, date2);
export const getUnixTime = (date: Date): number => dfnGetUnixTime(date);
export const getDay = (date: Date): number => dfnGetDay(date);
export const setTime = (date: Date, hours: number, minutes: number): Date =>dfnSet(date, { hours, minutes, seconds: 0, milliseconds: 0 });
export const eachHour = (start: Date, end: Date): Date[] =>eachHourOfInterval({ start, end });
export const isPastDate = (date: Date): boolean => isPast(date);
export const isWithin = (date: Date, start: Date, end: Date): boolean =>isWithinInterval(date, { start, end });
