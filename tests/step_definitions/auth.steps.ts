import { I } from './steps';

Given('я нахожусь на странице регистрации', () => {
  I.amOnPage('/register');
});

Given('я нахожусь на странице логина', () => {
  I.amOnPage('/login');
});

When('ввожу в поле c датой рождения значение {string}', (value: string) => {
  I.click(`[id="dateOfBirth"]`);
  I.fillField('[id="dateOfBirth"]', value);
});

When('проверить что я в аккаунте', () => {
  I.seeInCurrentUrl('/');
  I.wait(1);
  I.dontSee('Авторизация');
});

When(
  'я изменяю размер окна на {int} и {int} и нажимаю на иконку пользователя в хедере',
  (width: number, height: number) => {
    I.resizeWindow(width, height);
    I.wait(2);
    I.click(width <= 768 ? 'button[aria-haspopup="dialog"]' : 'button[aria-haspopup="menu"]');
  },
);

When('я нажимаю на кнопку {string} на размерах {int} и {int}', (btn: string, width: number, height: number) => {
  I.resizeWindow(width, height);
  I.wait(1);
  const locator = width <= 768 ? `//span[contains(text(), "${btn}")]` : `//div[@role="menuitem" and text()="${btn}"]`;

  I.moveCursorTo(locator);
  I.waitForVisible(locator, 3);
  I.click(locator);
});

Then('я должен быть перенаправлен на главную страницу и видеть ссылку на авторизацию', () => {
  I.seeInCurrentUrl('/');
  I.see('Авторизация');
  I.wait(2);
});
