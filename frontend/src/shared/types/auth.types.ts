export interface LoginMutation {
  telephone: string;
  password: string;
}

export interface RegisterMutation {
  telephone: string;
  email: string;
  password: string;
  dateOfBirth: string;
  fullName: string;
  gender: string;
  category: string;
}
