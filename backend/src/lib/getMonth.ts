export const getMonth = (month: string, style?: 'default' | 'ending') => {
  const months = [
    { name: 'Январь', value: 'january', ending: 'Январе' },
    { name: 'Февраль', value: 'february', ending: 'Феврале' },
    { name: 'Март', value: 'march', ending: 'Марте' },
    { name: 'Апрель', value: 'april', ending: 'Апреле' },
    { name: 'Май', value: 'may', ending: 'Мае' },
    { name: 'Июнь', value: 'june', ending: 'Июне' },
    { name: 'Июль', value: 'july', ending: 'Июле' },
    { name: 'Август', value: 'august', ending: 'Августе' },
    { name: 'Сентябрь', value: 'september', ending: 'Сентябре' },
    { name: 'Октябрь', value: 'october', ending: 'Октябре' },
    { name: 'Ноябрь', value: 'november', ending: 'Ноябре' },
    { name: 'Декабрь', value: 'december', ending: 'Декабре' },
  ];

  const monthObj = months.find((m) => m.value === month);
  if (!monthObj) {
    return '';
  }

  return style === 'ending' ? monthObj.ending : monthObj.name;
};
