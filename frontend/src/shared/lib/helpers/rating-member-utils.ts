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

export const usePlaces = (gender: 'male' | 'female', ratingType: string) => {
  const placesTop8 = Array.from({ length: 8 }, (_, i) => (i + 1).toString());
  const placesTop3 = Array.from({ length: 3 }, (_, i) => (i + 1).toString());

  if (gender === 'male') {
    return ratingType === 'mensTop8' ? placesTop8 : placesTop3;
  }

  return placesTop3;
};
