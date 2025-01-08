import { I } from './steps';

// Сценарий CRUD элемента социальной сети.

When('я нажимаю на текст {string} и в поле выбираю {string}', (select: string, value: string) => {
  I.click(select);
  I.click(value);
});

Then(/^в футер я вижу иконку у которой ссылка "(.*?)"$/, async (link: string) => {
  I.seeElement(`footer a.social-icon[href="mailto:${link}"]`);
});

Then('я вижу иконку {string}', (text: string) => {
  I.see(text, 'h3');
});

Then('я нажимаю на кнопку редактирования иконки {string}', (iconName: string) => {
  I.click(`//h3[text()="${iconName}"]/parent::div/following-sibling::div//button[@data-test-id="edit"]`);
});

Then('я нажимаю на кнопку удалить иконки {string}', (iconName: string) => {
  I.click(`//h3[text()="${iconName}"]/parent::div/following-sibling::div//button[@data-test-id="delete"]`);
});

Then(/^в футер я не вижу иконку у которой есть ссылка "(.*?)"$/, (link: string) => {
  I.dontSeeElement(`footer a.social-icon[href="mailto:${link}"]`);
});

// Сценарий CRUD элемента меню положение.

When('я вижу карточку у которой внутри есть текст {string}', (menuPositionName: string) => {
  I.see(menuPositionName, 'h3');
});

When('я нажимаю на кнопку редактирования меню положения {string}', (menuPositionName: string) => {
  I.click(`//h3[text()="${menuPositionName}"]/parent::div/following-sibling::div//button[@data-test-id="edit"]`);
});

When('я нажимаю на кнопку удаления меню положения {string}', (menuPositionName: string) => {
  I.click(`//h3[text()="${menuPositionName}"]/parent::div/following-sibling::div//button[@data-test-id="delete"]`);
});

// Сценарий UPDATE элемента публичная оферта.

Then(/^в футере я вижу обновленную ссылку на публичную оферту "(.*?)"$/, (link: string) => {
  I.seeElement(`footer a[href="${link}"]`);
});

// Сценарий UPDATE элемента генеральный партнер.

When('я обновлению изображение генерального партнера', () => {
  I.attachFile("input[type='file']", 'public/Knauf.svg');
});
