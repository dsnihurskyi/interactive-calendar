import React, { FC, useState } from 'react';
import Toolbar from '../Toolbar';
import CalendarGrid from '../CalendarGrid';
import { CalendarProvider } from '../../contexts/calendarContext';
import { useCountries } from '../../hooks/useCountries';

const CalendarGridPage: FC = () => {
  const { isLoading, isError, error } = useCountries();
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('UA');

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError && error instanceof Error) {
    return <span>Error while loading countries data: {error.message}</span>
  }

  return (
    <CalendarProvider>
      <Toolbar
        selectedCountryCode={selectedCountryCode}
        setSelectedCountryCode={setSelectedCountryCode}
      />
      <CalendarGrid selectedCountryCode={selectedCountryCode} />
    </CalendarProvider>
  )
}

export default CalendarGridPage;
