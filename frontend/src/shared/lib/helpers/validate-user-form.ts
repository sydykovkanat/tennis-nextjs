import { validateEmail } from '@/shared/lib';

export const validateUserForm = (id: string, value: string | boolean) => {
  let error = '';
  switch (id) {
    case 'rules':
    case 'personalData':
      if (typeof value === 'boolean' && !value) {
        error = 'Это поле обязательно для заполнения';
      }
      break;
    case 'telephone':
      if (!value) {
        error = 'Поле номера телефона обязательно';
      } else if (!value || (typeof value !== 'boolean' && value?.length < 12)) {
        error = 'Введите корректный номер телефона';
      }
      break;
    case 'email':
      if (!value) {
        error = 'Поле почты обязательно';
      } else if (!validateEmail(<string>value)){
        error = 'Некорректный формат почты';
      }
      break;
    case 'password':
      if (!value || typeof value !== 'boolean' && value?.length < 1) {
        error = 'Пароль должен быть не менее 1 символа';
      }
      break;
    case 'fullName':
      if (!value) {
        error = 'Поле ФИО обязательно';
      } else if (!value || typeof value !== 'boolean' && value?.trim().split(' ').length < 2) {
        error = 'Введите полное ФИО (минимум два слова)';
      }
      break;
    case 'gender':
    case 'category':
      if (!value) {
        error = `Выберите ${id === 'gender' ? 'пол' : 'категорию'}`;
      }
      break;
    case 'dateOfBirth':
      if (!value) {
        error = 'Выберите дату рождения';
      }
      break;
    default:
      break;
  }
  return error;
};