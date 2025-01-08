import { I } from './steps';

// Общие шаги

Given('я вижу запись пользователя с текстом {string}', (user: string) => {
  I.seeElement(`[data-testid="${user}"]`);
});

When('выбираю категорию {string} в селекте', async (value: string) => {
  I.click(`//*[@data-testid='category-filter']`);
  I.click(`//div[@role='option' and .//*[normalize-space(text())='${value}']]`);
});

// Создание, редактирование и деактивация пользователя

When('я нажимаю на кнопку деактивации в записи пользователя {string}', (user: string) => {
  I.click(`[data-testid='${user}'] button[data-testid='deactivate']`);
  I.wait(1);
});

When('я нажимаю на кнопку редактирования в записи пользователя {string}', (user: string) => {
  I.click(`[data-testid='${user}'] button[data-testid='edit']`);
  I.wait(1);
});

When('если я вижу кнопку активации у пользователя {string} то тест успешно завершен', (user: string) => {
  I.seeElement(`[data-testid='${user}'] button[data-testid='activate']`);
});

When('выбираю дату рождения {string} в календаре', (date: string) => {
  const [day, month, year] = date.split(' ');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString('ru-RU', { month: 'long' });

  I.waitForVisible("//div[@role='dialog']", 2);

  I.click(`//button[@role='combobox' and span[contains(text(), '${currentYear}')]]`);
  I.executeScript(function () {
    const element = document.querySelector("div[role='listbox']");
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  I.click(`//div[@role='listbox']//span[text()='${year}']`);

  I.click(`//button[@role='combobox' and span[contains(text(), '${currentMonth}')]]`);
  I.executeScript(function () {
    const element = document.querySelector("div[role='listbox']");
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  I.click(`//div[@role='listbox']//span[text()='${month}']`);

  I.click(`//button[@role='gridcell' and text()='${day}']`);
});
