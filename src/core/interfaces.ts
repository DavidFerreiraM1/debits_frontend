export interface IAddress {
  id?: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  }
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IClientUser {
  id?: number;
  useId: number;
  name: string;
  email: string;
  phone: string;
  webSite: string;
  address: IAddress;
  company: ICompany;
}