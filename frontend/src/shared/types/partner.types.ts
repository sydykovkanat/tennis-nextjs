export interface Partner {
  _id: string;
  name: string;
  image: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface PartnerMutation {
  name: string;
  image: File | null;
  url: string;
}
