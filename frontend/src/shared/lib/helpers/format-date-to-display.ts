import { format, parse } from 'date-fns';

export const formatDateToDisplay = (dateString: string): string => {
  try {
    const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
    return format(parsedDate, 'dd.MM.yyyy');
  } catch (error) {
    console.error('Invalid date format:', dateString, error);
    return dateString;
  }
};
