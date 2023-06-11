import React, { FC, useState, useMemo } from 'react';
import { getYear, getMonth, format } from 'date-fns';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createDaysForCalendarView } from '../../utilities/dateHelpers';
import { Day } from '../../global/types';
import { CALENDAR_ID, WEEKDAYS } from '../../consts/calendar';
import CalendarDay from '../CalendarDay';
import {
  Calendar,
  CalendarButton,
  CalendarContainer,
  CalendarHeader,
  SelectedMonth,
  WeekDay
} from './styled';
import { CalendarGridProps } from './types';
import { useGetHolidays } from '../../hooks/useGetHolidays';

const CalendarGrid: FC<CalendarGridProps> = ({ selectedCountryCode }) => {
  const today = new Date();
  const initialYear = getYear(today);
  const initialMonth = getMonth(today);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);

  const { data: holidays } = useGetHolidays(selectedYear, selectedCountryCode);

  const daysForCalendarView = useMemo(
    () => createDaysForCalendarView(selectedYear, selectedMonth),
    [selectedYear, selectedMonth]
  );

  const goToPrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedYear((prev) => prev - 1);
      setSelectedMonth(11);
    } else setSelectedMonth((prev) => prev - 1);
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedYear((prev) => prev + 1);
      setSelectedMonth(0);
    } else setSelectedMonth((prev) => prev + 1);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <CalendarContainer id={CALENDAR_ID}>
        <CalendarHeader>
          <CalendarButton onClick={goToPrevMonth}>
            Prev
          </CalendarButton>
          <SelectedMonth>
            {format(new Date(selectedYear, selectedMonth), 'MMMM yyyy')}
          </SelectedMonth>
          <CalendarButton onClick={goToNextMonth}>
            Next
          </CalendarButton>
        </CalendarHeader>

        <Calendar>
          {WEEKDAYS.map((weekday, index) => {
            return (
              <WeekDay key={'weekday-' + index}>
                {weekday}
              </WeekDay>
            )
          })}

          {daysForCalendarView.map((day: Day, index) => (
            <CalendarDay key={'day-box-' + index} day={day} holidays={holidays} />
          ))}
        </Calendar>
      </CalendarContainer>
    </DndProvider>
  )
}

export default CalendarGrid;
