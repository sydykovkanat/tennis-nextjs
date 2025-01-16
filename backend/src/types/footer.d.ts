export interface LinksMediaFields {
  name: string;
  value: string;
  isMail: boolean;
}

export interface LogoFields {
  logo: string;
}

export interface FooterFields {
  socialNetwork: LinksMediaFields[];
  menuPosition: LinksMediaFields[];
  publicOffer: string;
  mainPartnerImage: string | null;
  mainLogo: LogoFields[];
  currentLogo: string;
}
