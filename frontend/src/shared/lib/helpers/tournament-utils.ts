import { isAfter, parse } from 'date-fns';

export const isTournamentUpcoming = (eventDate: string): 'upcoming' | 'today' | 'completed' => {
  const parsedDate = parse(eventDate, 'dd.MM.yy', new Date());
  const currentDate = new Date();

  if (parsedDate.toDateString() === currentDate.toDateString()) {
    return 'today';
  }

  if (isAfter(parsedDate, currentDate)) {
    return 'upcoming';
  }

  return 'completed';
};

export function translateRank(rank: string): string {
  switch (rank) {
    case 'mixed':
      return 'Микст';
    case 'female':
      return 'Женский';
    case 'male':
      return 'Мужской';
    default:
      return 'Неизвестный разряд';
  }
}

export const getUpdatedSearchParams = (searchParams: URLSearchParams, key: string, value: string): string => {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  return `?${params.toString()}`;
};
