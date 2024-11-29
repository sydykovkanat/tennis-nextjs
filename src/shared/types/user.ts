export interface User {
  _id: string;
  category: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  fullName: string;
  telephone: string;
  dateOfBirth: string;
  isActive: boolean;
}
