'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useDatePicker = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDates, setSelectedDates] = useState<{ startDate?: Date; endDate?: Date }>({});

  useEffect(() => {
    if (Object.keys(selectedDates).length === 0) {
      const startDateParam = searchParams.get('startDate');
      const endDateParam = searchParams.get('endDate');

      if (startDateParam) {
        setSelectedDates((prev) => ({ ...prev, startDate: new Date(startDateParam) }));
      }
      if (endDateParam) {
        setSelectedDates((prev) => ({ ...prev, endDate: new Date(endDateParam) }));
      }
    }
  }, [searchParams, selectedDates]);

  const updateQueryParams = (startDate?: Date, endDate?: Date) => {
    const params = new URLSearchParams(searchParams?.toString() || '');

    if (startDate) {
      params.set('startDate', startDate.toISOString());
    } else {
      params.delete('startDate');
    }

    if (endDate) {
      params.set('endDate', endDate.toISOString());
    } else {
      params.delete('endDate');
    }

    void router.push(`?${params.toString()}`);
  };

  const handleDateSelect = (date: Date | undefined, type: 'startDate' | 'endDate') => {
    const newDates = { ...selectedDates, [type]: date };

    setSelectedDates(newDates);
    updateQueryParams(newDates.startDate, newDates.endDate);
  };

  const handleResetDates = () => {
    setSelectedDates({startDate: undefined, endDate: undefined});
    updateQueryParams();
  };

  return {
    selectedDates,
    handleDateSelect,
    handleResetDates,
  };
};
