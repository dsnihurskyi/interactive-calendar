import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CountryData } from '../global/types';

export const useCountries = () => useQuery({
  queryKey: ['countries'],
  queryFn: (): Promise<CountryData[]> =>
    axios
      .get('https://date.nager.at/api/v3/AvailableCountries')
      .then((res) => res.data),
});
