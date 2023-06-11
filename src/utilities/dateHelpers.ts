import {
  getDaysInMonth,
  getDay,
  getDate,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import { Day } from '../global/types';
import { TOTAL_CELLS_COUNT } from '../consts/calendar';

const createDayData = (
  year: number,
  month: number,
  dayOfMonth: number,
  isCurrentMonth: boolean
): Day => {
  const dayOfWeek = getDay(new Date(year, month, dayOfMonth));

  return {
    date: new Date(year, month, dayOfMonth),
    year,
    dayOfWeek,
    dayOfMonth,
    isCurrentMonth,
  };
};

const createDaysForCurrentMonth = (year: number, month: number) => {
  return [...Array(getDaysInMonth(new Date(year, month)))].map((day, index) => {
    return createDayData(year, month, index + 1, true);
  });
};

const createDaysForPreviousMonth = (year: number, month: number) => {
  const firstDayOfMonth = startOfMonth(new Date(year, month));
  const firstDayOfTheMonthWeekday = getDay(firstDayOfMonth) || 7;

  const prevMonthDays = [];

  // When adding negative number in new Date(year, month, negativeNumber), it returns days from prev month
  const indexOfFirstVisibleDayFromPrevMonth =
    -1 * (firstDayOfTheMonthWeekday - 2);

  for (let i = indexOfFirstVisibleDayFromPrevMonth; i <= 0; i++) {
    const dateInPrevMonth = getDate(new Date(year, month, i));
    prevMonthDays.push(createDayData(year, month - 1, dateInPrevMonth, false));
  }

  return prevMonthDays;
};

const createDaysForNextMonth = (year: number, month: number) => {
  const lastDayOfMonth = endOfMonth(new Date(year, month));
  const lastDayOfTheMonthWeekday = getDay(lastDayOfMonth) || 7;

  const nextMonthDays = [];

  // Number of next month days to complete the last week of the selected month
  const numberOfDaysLeftInLastWeekOfSelectedMonth = 7 - lastDayOfTheMonthWeekday;

  for (let i = 1; i <= numberOfDaysLeftInLastWeekOfSelectedMonth; i++) {
    nextMonthDays.push(createDayData(year, month + 1, i, false));
  }

  return nextMonthDays;
}

export const createDaysForCalendarView = (year: number, month: number) => {
  const combinedDays = [
    ...createDaysForPreviousMonth(year, month),
    ...createDaysForCurrentMonth(year, month),
    ...createDaysForNextMonth(year, month)
  ]

  // Here we check if extra days from next month are needed to complete the grid view and keep it always 42 cells
  // 7 columns x 6 rows
  if (combinedDays.length < TOTAL_CELLS_COUNT) {
    const lastDateInArray = combinedDays[combinedDays.length - 1].dayOfMonth;

    let nextDate = getDate(new Date(year, month, lastDateInArray + 1));
    for (let i = combinedDays.length; i < TOTAL_CELLS_COUNT; i++) {
      combinedDays.push(createDayData(year, month + 1, nextDate, false));
      nextDate++;
    }
  }

  return combinedDays;
};
