import { I } from './steps';

const monthsInRussian = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];

const getSelectors = (ariaLabel: string, altText: string) => ({
  modalSelector: `div[aria-label="${ariaLabel}"]`,
  carouselSelector: `div[aria-roledescription="carousel"]`,
  imageSelector: `div > div > div > img[alt="${altText}"]`,
});

const waitForModalAndImage = (ariaLabel: string, altText: string) => {
  const { modalSelector, carouselSelector, imageSelector } = getSelectors(ariaLabel, altText);

  I.waitForVisible(modalSelector, 1);
  I.waitForVisible(carouselSelector, 1);
  I.waitForVisible(imageSelector, 1);
};

const clickCarouselNextAndVerifyImage = (buttonLabel: string, altText: string) => {
  const { modalSelector, carouselSelector, imageSelector } = getSelectors('news-images-modal', altText);
  const nextButtonSelector = `button[aria-label="${buttonLabel}"]`;

  I.waitForVisible(modalSelector, 1);
  I.waitForVisible(carouselSelector, 1);
  I.waitForVisible(nextButtonSelector, 1);
  I.click(nextButtonSelector);
  I.waitForVisible(imageSelector, 1);
};

const clickDateFilterButton = (ariaLabel: string) => {
  const buttonSelector = `button[aria-label="${ariaLabel}"]`;
  I.click(buttonSelector);
};

const checkCard = (cardText: string) => {
  I.see(cardText, 'a > div > h3');
};

When(/^я ввожу файл "(.*?)" в поле "(.*?)"$/, (filePath: string, inputLabel: string) => {
  I.wait(3);
  I.attachFile(`input[aria-label="${inputLabel}"]`, filePath);
});

Then(/^ввожу в поле c дивом "(.*?)" значение "(.*?)"$/, (placeholder: string, value: string) => {
  const selector = `div[data-placeholder="${placeholder}"]`;
  I.waitForVisible(selector, 2);
  I.fillField(selector, value);
});

Then(/^вижу изображение с alt "(.*?)"$/, (altText: string) => {
  const selector = `img[alt="${altText}"]`;
  I.waitForVisible(selector, 2);
});

Then(/^я могу удалить изображение с alt "(.*?)" нажав на кнопку с "(.*?)"$/, (altText: string, button: string) => {
  const imageSelector = `img[alt="${altText}"]`;
  const buttonSelector = `button[aria-label="${button}"]`;
  const deleteButtonSelector = `div[data-radix-popper-content-wrapper] button`;

  I.waitForVisible(imageSelector, 2);
  I.waitForVisible(buttonSelector, 2);

  I.click(buttonSelector);

  I.waitForVisible(deleteButtonSelector, 2);
  I.click(locate(deleteButtonSelector).withText('Удалить'));
});

When(/^я больше не вижу изображение с alt "(.*?)"$/, (altText: string) => {
  const imageSelector = `img[alt="${altText}"]`;
  I.dontSeeElement(imageSelector);
});

Then(/^я вижу карточку новости с текстом "(.*?)"$/, (cardText: string) => {
  checkCard(cardText);
});

When(/^нажимаю на кнопку удаления новости "(.*?)"$/, (cardText: string) => {
  const cardSelector = locate('a h3').withText(cardText);
  const deleteButton = locate('button[aria-label="delete-news"]').inside(locate('div').withText(cardText));

  I.waitForVisible(cardSelector, 2);
  I.waitForVisible(deleteButton, 2);
  I.click(deleteButton);

  const deleteButtonSelector = `div[data-radix-popper-content-wrapper] button`;
  I.waitForVisible(deleteButtonSelector, 2);

  I.click(locate(deleteButtonSelector).withText('Удалить'));
});

When(/^нажимаю на карточку новости "(.*?)"$/, (cardText: string) => {
  const cardSelector = locate('a h3').withText(cardText);

  I.waitForVisible(cardSelector, 3);
  I.click(cardSelector);
  I.wait(5);
});

Then(/^вижу блок изображений новости "(.*?)"$/, (ariaLabel: string) => {
  const sectionSelector = `section[aria-label="${ariaLabel}"]`;
  I.waitForVisible(sectionSelector, 2);
});

When(/^могу нажать на изображение с alt "(.*?)"$/, (altText: string) => {
  const imageSelector = `img[alt="${altText}"]`;
  I.waitForVisible(imageSelector, 2);
  I.click(imageSelector);
});

Then(/^мне выходит модальное окно "(.*?)" с изображением "(.*?)"$/, (ariaLabel: string, altText: string) => {
  waitForModalAndImage(ariaLabel, altText);
});

When(
  /^могу перелистывать изображения в модальном окне, нажав на кнопку "(.*?)", я вижу изображение "(.*?)"$/,
  (buttonLabel: string, altText: string) => {
    clickCarouselNextAndVerifyImage(buttonLabel, altText);
  },
);

When(/^я закрываю модальное окно нажав на кнопку "(.*?)"$/, (buttonLabel: string) => {
  const modalSelector = `div[aria-label="news-images-modal"]`;
  const closeButtonSelector = `button[aria-label="${buttonLabel}"]`;

  I.waitForVisible(modalSelector, 1);
  I.waitForVisible(closeButtonSelector, 1);
  I.click(closeButtonSelector);
});

Then(/^вижу заголовок новости "(.*?)"$/, (headlineText: string) => {
  I.see(headlineText, 'h1');
});

Then(/^вижу контент новости "(.*?)" с текстом "(.*?)"$/, (ariaLabel: string, contentText: string) => {
  const contentTextSelector = `section[aria-label="${ariaLabel}"] p`;
  I.see(contentText, contentTextSelector);
});

Then(/^я вижу другие новости "(.*?)" и карточку с текстом "(.*?)"$/, (ariaLabel: string, cardText: string) => {
  const sectionSelector = `section[aria-label="${ariaLabel}"]`;
  const cardSelector = locate('a h3').withText(cardText);

  I.waitForVisible(sectionSelector, 1);
  I.see(cardText, cardSelector);
});

When(/^нажимаю на кнопку фильтрации новостей "(.*?)"$/, (ariaLabel: string) => {
  clickDateFilterButton(ariaLabel);
});

Then(/^я выбираю "(.*?)" день "(.*?)" месяца$/, (day: string, month: string) => {
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const lastDay = new Date(currentYear, monthsInRussian.indexOf(month) + 1, 0).getDate();
  const selectedDay = day === 'последний' ? String(lastDay) : day;

  const calendarSelector = `div[role="presentation"]`;
  const exactDayButtonSelector = `//button[normalize-space(text())='${selectedDay}']`;
  const goToPreviousMonthButtonSelector = `button[aria-label="Go to previous month"]`;

  I.waitForVisible(calendarSelector, 1);

  let currentMonthIndex = currentDate.getMonth();
  const targetMonthIndex = monthsInRussian.indexOf(month);

  if (month !== monthsInRussian[currentMonthIndex]) {
    while (currentMonthIndex !== targetMonthIndex) {
      I.click(goToPreviousMonthButtonSelector);
      currentMonthIndex = (currentMonthIndex - 1 + 12) % 12;
    }

    if (month === 'декабрь') {
      currentYear -= 1;
      I.see(`декабрь ${currentYear}`, calendarSelector);
    } else {
      I.see(`${month} ${currentYear}`, calendarSelector);
    }
  } else {
    I.see(`${month} ${currentYear}`, calendarSelector);
  }

  I.waitForVisible(exactDayButtonSelector, 3);
  I.click(exactDayButtonSelector);

  if (selectedDay !== String(lastDay)) {
    clickDateFilterButton('news-start-date');
  } else {
    clickDateFilterButton('news-end-date');
  }

  I.wait(1);
});

When(/^я сбрасываю фильтры, нажав на "(.*?)"$/, (ariaLabel: string) => {
  clickDateFilterButton(ariaLabel);
});

Then(/^если месяц (.*), то я вижу карточку новости с текстом "(.*)"$/, (monthName: string, cardText: string) => {
  const currentDate = new Date();
  const monthIndex = monthsInRussian.indexOf(monthName.toLowerCase());

  if (monthIndex === currentDate.getMonth()) {
    checkCard(cardText);
  }
});

When(/^нажимаю на кнопку редактирования новости "(.*?)"$/, (cardText: string) => {
  const cardSelector = locate('a h3').withText(cardText);
  const editButton = locate('button[aria-label="edit-news"]').inside(locate('div').withText(cardText));

  I.waitForVisible(cardSelector, 2);
  I.waitForVisible(editButton, 2);
  I.click(editButton);
});
