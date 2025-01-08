export const { I } = inject();

Then('нажимаю на кнопку редактировать у события', () => {
  I.click(locate(`button[aria-label="edit-event"]`));
  I.wait(1);
});

Given('вижу Заголовок {string}', (text: string) => {
  I.seeElement(text);
  I.wait(1);
});

Then('нажимаю на кнопку удалить у события', () => {
  I.click(locate(`button[aria-label="delete-event"]`));
  I.wait(1);
});

Given('я вижу карточку с годом {string}', (year: string) => {
  I.seeElement(`[data-testid="${year}"]`);
});

Then('нажимаю на кнопку удалить у рейтинга', () => {
  I.click(locate('button[aria-label="deleteRating"]'));
  I.wait(1);
});

Given('я нахожусь на странице рейтингов', () => {
  I.amOnPage('/rating');
});
