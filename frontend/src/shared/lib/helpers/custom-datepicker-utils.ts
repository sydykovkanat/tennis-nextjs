import { parse } from 'date-fns';

export const parseUserDate = (dateString: string): Date | undefined => {
  return dateString ? parse(dateString, 'yyyy-MM-dd', new Date()) : undefined;
};

export const parseTournamentDate = (dateString: string): Date | undefined => {
  const dateParts = dateString.split('.');
  if (dateParts.length === 3) {
    const [day, month, year] = dateParts;
    const formattedYear = year.length === 2 ? `20${year}` : year;
    return new Date(`${formattedYear}-${month}-${day}`);
  }
  return undefined;
};

export const getParser = (mode: 'calendar' | 'users') => {
  return mode === 'users' ? parseUserDate : parseTournamentDate;
};
