export const formatTelephone = (value: string) => {
  const digitsOnly = value.replace(/\D/g, '');
  let formattedPhone = digitsOnly;

  if (digitsOnly.length > 1) {
    formattedPhone = '0' + digitsOnly.slice(1, 4);
  }
  if (digitsOnly.length > 4) {
    formattedPhone += ' ' + digitsOnly.slice(4, 7);
  }
  if (digitsOnly.length > 7) {
    formattedPhone += ' ' + digitsOnly.slice(7, 10);
  }

  return formattedPhone;
};
