export const getGenderTitles = (gender: 'male' | 'female') => {
  const titles = {
    male: {
      buttonTitle: 'мужской',
      dialogTitle: 'мужского',
    },
    female: {
      buttonTitle: 'женский',
      dialogTitle: 'женского',
    },
  };

  return titles[gender];
};
