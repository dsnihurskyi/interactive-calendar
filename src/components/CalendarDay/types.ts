import { Day, HolidayData } from "../../global/types";

export interface CalendarDayProps {
  day: Day;
  holidays?: HolidayData[] | null;
};
