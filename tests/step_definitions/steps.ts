export const { I } = inject();

const pageMap: Record<string, string> = {
  register: '/register',
  login: '/login',
  calendar: '/calendar',
  rating: '/rating',
  news: '/news',
};

//переход по страницам
Given('я нахожусь на странице {string}', (page: string) => {
  I.amOnPage(pageMap[page]);
});

//клик на кнопку
When('нажимаю на кнопку {string}', (btn: string) => {
  I.wait(5);
  I.click(btn);
});

//вести что-то в инпут
When('ввожу в поле {string} значение {string}', (field: string, value: string) => {
  I.fillField(field, value);
});

//выбрать что-то из селекта
When('в поле {string} выбираю {string}', (select: string, value: string) => {
  I.selectOption(`//*[contains(text(), '${select}')]/following-sibling::select`, value);
});

//кликнуть на чекбокс
When('в поле {string} кликаю на галочку в чекбоксах.', (checkboxLabel: string) => {
  I.click(`//label[contains(text(), '${checkboxLabel}')]/preceding-sibling::button`);
});

//переход на главную страницу
When('я должен быть на главной странице', () => {
  I.seeInCurrentUrl('/');
  I.wait(1);
});

//логинка
Given('я авторизован на сайте', () => {
  I.amOnPage('/login');
  I.fillField('Телефон', '0555555555');
  I.fillField('Пароль', '123qwe');
  I.click('Войти');
  I.seeInCurrentUrl('/');
  I.wait(3);
});

//вход в админку
Given('я должен быть в административной панели', () => {
  I.click('button[aria-haspopup="menu"]');
  I.seeElement('#admin');
  I.click('#admin');
  I.wait(3);
});

//проверка на успешность теста в админке если у тебя тост уведомление
When('если я вижу текст {string} то тест успешно завершен', (Msg: string) => {
  I.see(Msg);
});
