export const formatChapter = (chapter: 'male' | 'female' | 'mixed') => {
  return chapter === 'male' ? 'Мужской рейтинг' : chapter === 'female' ? 'Женский рейтинг' : 'Смешанный рейтинг';
};
