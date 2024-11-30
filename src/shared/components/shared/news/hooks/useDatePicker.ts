'use client';

import { useState } from 'react';

interface UseDatePickerProps {
  onDateChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
}

export const useDatePicker = ({ onDateChange }: UseDatePickerProps) => {
  const [selectedDates, setSelectedDates] = useState<{ startDate?: Date; endDate?: Date }>({});

  const handleDateSelect = (date: Date | undefined, type: 'startDate' | 'endDate') => {
    const newDates = {
      ...selectedDates,
      [type]: date,
    };
    setSelectedDates(newDates);
    onDateChange(newDates.startDate, newDates.endDate);
  };

  const handleResetDates = () => {
    setSelectedDates({});
    onDateChange(undefined, undefined);
  };

  return {
    selectedDates,
    handleDateSelect,
    handleResetDates,
  };
};
