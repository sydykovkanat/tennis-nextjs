import { I } from './steps';

When(/^я загружаю файл "(.*?)"$/, (file: string) => {
  I.wait(3);
  I.attachFile("input[type='file']", `${file}`);
});

When('я кликаю на кнопку с инконкой в котором есть дата {string}', (dataId: string) => {
  I.wait(3);
  I.waitForElement(`[data-test-id='${dataId}']`, 10);
  I.click(`[data-test-id="${dataId}"]`);
});
