import { I } from './steps';

Then(`я вижу карточку категории, у которой внутри есть текст {string}`, (card: string) => {
  I.seeElement(`//h3[text()="${card}"]`);
});

Then('нажимаю на кнопку редактировать у категории {string}', (category: string) => {
  I.click(
    `//h3[text()="${category}"]/ancestor::div[contains(@class, 'rounded-xl')]/descendant::button[@aria-label="edit-category"]`,
  );
  I.click(locate(`button[aria-label="edit-category"]`));
});

When('вижу поле "Название" с текстом {string}', (text: string) => {
  I.seeElement(`input#category[value="${text}"]`);
});

Then('вижу текст {string}', (text: string) => {
  I.see(text);
});

When('я вижу пользователя с категорией {string}', (category: string) => {
  I.see(category, 'td');
});

Then('нажимаю на кнопку удалить у категории {string}', (category: string) => {
  I.click(
    `//h3[text()="${category}"]/ancestor::div[contains(@class, 'rounded-xl')]/descendant::button[@aria-label="delete-category"]`,
  );
  I.click(locate(`button[aria-label="delete-category"]`));
});

When(`не вижу карточку категории, у которой внутри есть текст {string}`, (card: string) => {
  I.dontSee(`//h3[text()="${card}"]`);
});
