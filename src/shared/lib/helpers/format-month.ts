export const formatMonth = (month: string) => {
  let formattedMonth: string;

  switch (month) {
    case 'january':
      formattedMonth = 'Январь';
      break;
    case 'february':
      formattedMonth = 'Февраль';
      break;
    case 'march':
      formattedMonth = 'Март';
      break;
    case 'april':
      formattedMonth = 'Апрель';
      break;
    case 'may':
      formattedMonth = 'Май';
      break;
    case 'june':
      formattedMonth = 'Июнь';
      break;
    case 'july':
      formattedMonth = 'Июль';
      break;
    case 'august':
      formattedMonth = 'Август';
      break;
    case 'september':
      formattedMonth = 'Сентябрь';
      break;
    case 'october':
      formattedMonth = 'Октябрь';
      break;
    case 'november':
      formattedMonth = 'Ноябрь';
      break;
    case 'december':
      formattedMonth = 'Декабрь';
      break;
    default:
      formattedMonth = 'Неизвестный месяц';
      break;
  }

  return formattedMonth;
};
