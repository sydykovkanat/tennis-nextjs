import { I } from './steps';

When(/^я загружаю файл "(.*?)"$/, (file:string) => {
  I.attachFile("input[type='file']", `${file}`);
  I.wait(1);
});

When('я кликаю на кнопку с инконкой в котором есть дата {string}', (dataId:string) => {
  I.waitForElement(`[data-test-id='${dataId}']`, 10);
  I.click(`[data-test-id="${dataId}"]`);
});