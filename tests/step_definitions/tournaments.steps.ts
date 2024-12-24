import { I } from './steps';

// Общие шаги

Given('я вижу карточку с текстом {string}', (tournamentName: string) => {
  I.seeElement(`[data-testid="${tournamentName}"]`);
});

// Просмотр турнира

When('я нажимаю на кнопку {string} в карточке турнира', (btn: string) => {
  I.click(`//span[@data-testid='tournament-actions-link' and contains(normalize-space(text()), '${btn}')]`);
});

Then("я вижу кнопку 'Результаты Турнира' с атрибутом href", () => {
  I.see('Результаты Турнира', "[data-testid='tournament-actions-link']");
  I.seeElement({
    css: "[data-testid='tournament-actions-link'][href*='https://www.google.com']",
  });
});

// Crud турниров

Then('я нажимаю на кнопку в админ панели {string}', (btn: string) => {
  I.click(`//button[@type='button' and @role='tab' and contains(text(), '${btn}')]`);
});

When('я нажимаю на кнопку удаления в карточке турнира {string}', (tournamentName: string) => {
  I.click(`[data-testid="${tournamentName}"] button[data-testid="delete"]`);
  I.wait(1);
});

When('я нажимаю на кнопку редактирования в карточке турнира {string}', (tournamentName: string) => {
  I.click(`[data-testid="${tournamentName}"] button[data-testid="edit"]`);
  I.wait(1);
});

When('выбираю дату турнира {string} в календаре', (date: string) => {
  const [day, month] = date.split(' ');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString('ru-RU', { month: 'long' });

  I.waitForVisible("//div[@role='dialog']", 2);

  I.click(`//button[@role='combobox' and span[contains(text(), '${currentYear}')]]`);
  I.executeScript(function () {
    const element = document.querySelector("div[role='listbox']");
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  I.click(`//div[@role='listbox']//span[text()='${currentYear}']`);

  I.click(`//button[@role='combobox' and span[contains(text(), '${currentMonth}')]]`);
  I.executeScript(function () {
    const element = document.querySelector("div[role='listbox']");
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  I.click(`//div[@role='listbox']//span[text()='${month}']`);

  I.click(`//button[@role='gridcell' and text()='${day}']`);
});
