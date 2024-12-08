export const PAGES = {
  home: '/',
  news: '/news',
  admin: '/admin',
  calendar: '/calendar',
};

export const ADMIN_PAGES = [
  { value: 'partners', name: 'Партнеры', url: `${PAGES.admin}/partners` },
  { value: 'category', name: 'Категории', url: `${PAGES.admin}/category` },
  { value: 'carousel', name: 'Карусель', url: `${PAGES.admin}/carousel` },
  { value: 'top', name: 'Топ Игроки', url: `${PAGES.admin}/top` },
  { value: 'calendar', name: 'Календарь', url: `${PAGES.admin}/calendar` },
  { value: 'rating', name: 'Рейтинги', url: `${PAGES.admin}/rating` },
  { value: 'news', name: 'Новости', url: `${PAGES.admin}/news` },
  { value: 'footer', name: 'Подвал сайта', url: `${PAGES.admin}/footer` },
  { value: 'users', name: 'Список пользователей', url: `${PAGES.admin}/users` },
];
