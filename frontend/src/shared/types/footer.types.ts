export interface FooterElementsData {
  _id: string;
  mainPartnerImage: string;
  menuPosition: MenuPositionFields[];
  publicOffer: string;
  socialNetwork: SocialNetworkFields[];
  mainLogo: MainLogo[];
}

export interface SocialNetworkFields {
  _id: string;
  name: string;
  value: string;
  isMail: boolean;
}

export interface NavigationItemsTypes {
  name: string;
  link: string;
}

export interface MainPartnerForm {
  image: string | null;
}

export interface SocialOneNetworkField {
  socialNetwork: [
    {
      _id: string;
      name: string;
      value: string;
    },
  ];
}

export interface MenuPositionFields {
  _id: string;
  name: string;
  value: string;
}

export interface MenuOnePositionField {
  menuPosition: [
    {
      _id: string;
      name: string;
      value: string;
    },
  ];
}

export interface MainLogo {
  _id:string
  logo: string;
}

export interface LinkDataMutation {
  name: string;
  value: string;
}

export interface SocialNetworkIconsValue {
  name: string;
}

export interface MainLogoMutation {
  logo: string | null;
}
