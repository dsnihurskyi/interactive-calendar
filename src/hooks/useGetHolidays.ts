import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { HolidayData } from '../global/types';

export const useGetHolidays = (year: number, countryCode: string) => useQuery({
  queryKey: ['holidays', year, countryCode],
  queryFn: async (): Promise<HolidayData[] | null> => {
    if (!year || !countryCode) {
      return null;
    } else {
      try {
        const { data } = await axios.get(
          `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
        );

        return data || null;
      } catch (error) {
        return null;
      }
    }
  },
});
