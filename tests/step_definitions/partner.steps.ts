import { I } from './steps';

Given('Загружаю изображения', () => {
  I.attachFile("input[type='file']", 'public/Knauf.svg');
  I.wait(1);
});

Given('я вижу карточку партнера {string}', (partnerName: string) => {
  I.seeElement(`[data-testid="${partnerName}"]`);
  I.wait(2);
});

When('я нажимаю на кнопку редактирования партнера {string}', (partnerName: string) => {
  I.click(`[data-testid="${partnerName}"] button[data-testid="edit"]`);
  I.wait(1);
});
When('я нажимаю на кнопку удаления партнера {string}', (partnerName: string) => {
  I.click(`[data-testid="${partnerName}"] button[data-testid="delete"]`);
  I.wait(2);
});
