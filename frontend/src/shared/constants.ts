import { NavigationItemsTypes } from '@/shared/types/footer.types';

export const API_URL = 'http://localhost:8000';

export const CURRENT_YEAR_FULL = new Date().getFullYear();
export const NEXT_YEAR = CURRENT_YEAR_FULL + 1;
export const PREVIOUS_YEAR = CURRENT_YEAR_FULL - 1;
export const MONTH_NAMES = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const NAVIGATION_ITEMS: NavigationItemsTypes[] = [
  { name: 'Главная', link: '/' },
  { name: 'Календарь', link: '/calendar' },
  { name: 'Рейтинг', link: '/rating' },
  { name: 'Блог', link: '/news' },
];
