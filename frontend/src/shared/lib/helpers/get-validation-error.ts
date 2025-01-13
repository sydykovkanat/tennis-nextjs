import { ValidationError } from '@/shared/types/user.types';

export const getValidationError = (error: ValidationError | null, fieldName: string) => {
  try {
    return error?.errors[fieldName].message;
  } catch {
    return undefined;
  }
};
