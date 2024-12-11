import { format, isValid, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

type FormatDate = (date: string | Date, style: string) => string;

export const formatDate: FormatDate = (date, style) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) ? format(parsedDate, style, { locale: ru }) : 'Некорректная дата';
};

//надо перевести это на бэк
