import { I } from './steps';

// Общие шаги

Given('я вижу карточку с текстом {string}', (memberName: string) => {
  I.seeElement(`[data-testid="${memberName}"]`);
});

// Crud участника рейтинга

When('я нажимаю на кнопку удаления в карточке участника рейтинга {string}', (memberName: string) => {
  I.click(`[data-testid="${memberName}"] button[data-testid="delete"]`);
  I.wait(1);
});

When('я нажимаю на кнопку редактирования в карточке участника рейтинга {string}', (memberName: string) => {
  I.click(`[data-testid="${memberName}"] button[data-testid="edit"]`);
  I.wait(1);
});
